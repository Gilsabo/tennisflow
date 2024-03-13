import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteUser } from '../../../../database/users';
import { User } from '../../../../migrations/00000-createTableUsers';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type Error = {
  error: string;
};

export type DeleteUserResponseBody =
  | {
      deletedUser: User;
    }
  | Error;

const userSchema = z.object({
  id: z.number(),
  userName: z.string(),
  profilePictureUrl: z.string(),
});

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<DeleteUserResponseBody>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'User name does not exist or is incorrect',
      },
      { status: 400 },
    );
  }

  // const deletedVideo = await cloudinary.api
  //   .delete_resources([`${result.data.profilePictureUrl}`], {
  //     type: 'upload',
  //     resource_type: 'image',
  //   })
  //   .then(deletedVideo);

  try {
    const deletedVideo = await cloudinary.api.delete_resources(
      [`${result.data.profilePictureUrl}`],
      {
        type: 'upload',
        resource_type: 'image',
      },
    );
    console.log(deletedVideo); // Handle the result here if needed
  } catch (error) {
    console.error('Error deleting resources:', error);
  }

  const deleteUserInformations = await deleteUser(result.data.userName);

  if (!deleteUserInformations) {
    return NextResponse.json(
      {
        error: 'Error deleting user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    deletedUser: deleteUserInformations,
  });
}

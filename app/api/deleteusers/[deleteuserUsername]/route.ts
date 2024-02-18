import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteUser } from '../../../../database/users';
import { User } from '../../../../migrations/00000-createTableUsers';

export type Error = {
  error: string;
};

export type DeleteUserResponseBody =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  id: z.number(),
  userName: z.string(),
});

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<DeleteUserResponseBody>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'userName does not exist or is incorrect',
      },
      { status: 400 },
    );
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
    user: deleteUserInformations,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUserProfile } from '../../../database/profiles';
import { UserProfile } from '../../../migrations/00002-createTableUserProfiles';

export type Error = {
  error: string;
};

export type UserProfilesResponseBodyGet =
  | {
      userProfile: UserProfile;
    }
  | Error;

const userProfilsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  yearsExperience: z.number(),
  dominantHand: z.string(),
  description: z.string(),
  profilePictureUrl: z.string().nullable(),
  userId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UserProfilesResponseBodyGet>> {
  const body = await request.json();

  const result = userProfilsSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error

    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  const userProfile = await createUserProfile(
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    result.data.age,
    result.data.yearsExperience,
    result.data.dominantHand,
    result.data.description,
    result.data.profilePictureUrl,
    result.data.userId,
  );

  if (!userProfile) {
    return NextResponse.json(
      {
        error: 'Error creating the new profile',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    userProfile: userProfile,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateProfileByUserProfileId } from '../../../../database/profiles';
import { UserProfile } from '../../../../migrations/00002-createTableUserProfiles';
import { Error } from '../route';

type UserProfileResponseBodyPut = { userProfile: UserProfile } | Error;

const userProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  yearsExperience: z.number(),
  dominantHand: z.string(),
  description: z.string(),
  profilePictureUrl: z.string().optional(),
  userId: z.number(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserProfileResponseBodyPut>> {
  const userNameFromParams = params.userprofileUsername;

  if (!userNameFromParams) {
    return NextResponse.json(
      {
        error: 'Could not find user name ',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = userProfileSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  const userProfileUpdated = await updateProfileByUserProfileId(
    result.data.userId,
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    result.data.age,
    result.data.yearsExperience,
    result.data.dominantHand,
    result.data.description,
    result.data.profilePictureUrl,
  );

  if (!userProfileUpdated) {
    return NextResponse.json(
      {
        error: 'Failed to update user profile',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    userProfile: userProfileUpdated,
  });
}

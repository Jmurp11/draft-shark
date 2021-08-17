import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};



export type AdminInput = {
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};


export type DeleteNoteInput = {
  id: Scalars['String'];
};

export type DeleteTargetArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['String'];
  user: User;
  title: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  creationTime: Scalars['DateTime'];
  updatedTime: Scalars['DateTime'];
};

export type FolderArgs = {
  filterType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
};

export type LoginInput = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  success?: Maybe<LoginSuccess>;
  errors?: Maybe<Array<Response>>;
};

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  user?: Maybe<User>;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFolder: Result;
  editFolder: Result;
  deleteFolder: Result;
  createNote: Result;
  editNote: Result;
  deleteNote: Result;
  updatePlayers: Result;
  createProjection: Result;
  createTarget: Result;
  deleteTarget: Result;
  updateTeams: Result;
  addTeamStats: Result;
  register: Result;
  login?: Maybe<LoginResult>;
  updateAdminStatus: Result;
  confirmUser: Result;
  forgotPassword: Result;
  changePassword: Result;
  logout: Result;
  updateUserProfileImage: Result;
  getNews: Result;
  updateStadiums: Result;
  updateStandings: Result;
};


export type MutationCreateFolderArgs = {
  input: FolderArgs;
};


export type MutationEditFolderArgs = {
  input: FolderArgs;
};


export type MutationDeleteFolderArgs = {
  input: FolderArgs;
};


export type MutationCreateNoteArgs = {
  references: Array<PlayerReferenceInput>;
  input: NoteInput;
};


export type MutationEditNoteArgs = {
  input: NoteInput;
};


export type MutationDeleteNoteArgs = {
  input: DeleteNoteInput;
};


export type MutationCreateProjectionArgs = {
  input: ProjectionInput;
};


export type MutationCreateTargetArgs = {
  input: TargetInput;
};


export type MutationDeleteTargetArgs = {
  input: DeleteTargetArgs;
};


export type MutationAddTeamStatsArgs = {
  input: TeamStatsInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateAdminStatusArgs = {
  input: AdminInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationUpdateUserProfileImageArgs = {
  input: UpdateImageInput;
};

export type News = {
  __typename?: 'News';
  id: Scalars['Float'];
  source: Scalars['String'];
  timeAgo: Scalars['String'];
  updated: Scalars['DateTime'];
  title: Scalars['String'];
  content: Scalars['String'];
  playerId?: Maybe<Player>;
  teamId: Scalars['String'];
  originalSource: Scalars['String'];
  originalSourceUrl: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['String'];
  user: User;
  folder?: Maybe<Folder>;
  title: Scalars['String'];
  body: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  creationTime: Scalars['DateTime'];
  updatedTime: Scalars['DateTime'];
  references?: Maybe<Array<Player>>;
};

export type NoteArgs = {
  filterType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['Float']>;
  user?: Maybe<Scalars['String']>;
  folder?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
};

export type NoteInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  folder?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  isPrivate: Scalars['Boolean'];
};

export type Notification = {
  __typename?: 'Notification';
  user: User;
  note: Note;
  type: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  initialName: Scalars['String'];
  heightFeet?: Maybe<Scalars['Float']>;
  heightInches?: Maybe<Scalars['Float']>;
  height: Scalars['String'];
  weight?: Maybe<Scalars['Float']>;
  team?: Maybe<Team>;
  position: Scalars['String'];
  status: Scalars['String'];
  depthChart?: Maybe<Scalars['Float']>;
  photoUrl: Scalars['String'];
  birthDate?: Maybe<Scalars['String']>;
  age: Scalars['Float'];
  college?: Maybe<Scalars['String']>;
  draftYear?: Maybe<Scalars['Float']>;
  draftRound?: Maybe<Scalars['Float']>;
  draftPick?: Maybe<Scalars['Float']>;
  isUndrafted: Scalars['Boolean'];
  averageDraftPosition?: Maybe<Scalars['Float']>;
  projection?: Maybe<Projection>;
  news?: Maybe<Array<News>>;
  references?: Maybe<Array<Note>>;
};

export type PlayerArgs = {
  filterType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
};

export type PlayerReferenceInput = {
  player?: Maybe<Scalars['Float']>;
};

export type Projection = {
  __typename?: 'Projection';
  id: Scalars['Float'];
  player: Player;
  completions: Scalars['Float'];
  attempts: Scalars['Float'];
  completionPercentage?: Maybe<Scalars['Float']>;
  yardsPerAttempt?: Maybe<Scalars['Float']>;
  passYards: Scalars['Float'];
  passTd: Scalars['Float'];
  interception: Scalars['Float'];
  carries: Scalars['Float'];
  rushYards: Scalars['Float'];
  yardsPerCarry?: Maybe<Scalars['Float']>;
  rushTd: Scalars['Float'];
  fumbles: Scalars['Float'];
  receptions: Scalars['Float'];
  receivingYards: Scalars['Float'];
  yardsPerReception?: Maybe<Scalars['Float']>;
  receivingTd: Scalars['Float'];
  halfPPRTotalPoints: Scalars['Float'];
  pprTotalPoints: Scalars['Float'];
  totalPoints: Scalars['Float'];
  touches: Scalars['Float'];
};

export type ProjectionInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  team: Scalars['String'];
  completions: Scalars['Float'];
  attempts: Scalars['Float'];
  passTd: Scalars['Float'];
  passYards: Scalars['Float'];
  interception: Scalars['Float'];
  carries: Scalars['Float'];
  rushYards: Scalars['Float'];
  rushTd: Scalars['Float'];
  fumbles: Scalars['Float'];
  receptions: Scalars['Float'];
  receivingYards: Scalars['Float'];
  receivingTd: Scalars['Float'];
  fantasyPoints: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  folders: Array<Folder>;
  folder: Folder;
  folderCount: Scalars['Int'];
  notes: Array<Note>;
  note: Note;
  noteCount: Scalars['Int'];
  players: Array<Player>;
  player: Player;
  projections: Array<Projection>;
  projection: Projection;
  targets: Array<Target>;
  target: Target;
  avgTargetRound?: Maybe<Scalars['Float']>;
  teams: Array<Team>;
  team: Team;
  allTeamsStats: Array<TeamStats>;
  teamStat: TeamStats;
  users: Array<User>;
  user: User;
  stadiums: Array<Stadium>;
  standings: Array<Standings>;
  standing: Standings;
  me?: Maybe<User>;
};


export type QueryFoldersArgs = {
  input: FolderArgs;
};


export type QueryFolderArgs = {
  input: FolderArgs;
};


export type QueryFolderCountArgs = {
  user: Scalars['String'];
};


export type QueryNotesArgs = {
  input: NoteArgs;
};


export type QueryNoteArgs = {
  input: NoteArgs;
};


export type QueryNoteCountArgs = {
  user: Scalars['String'];
};


export type QueryPlayersArgs = {
  input?: Maybe<PlayerArgs>;
};


export type QueryPlayerArgs = {
  input: PlayerArgs;
};


export type QueryProjectionArgs = {
  player: Scalars['String'];
};


export type QueryTargetsArgs = {
  input: TargetArgs;
};


export type QueryTargetArgs = {
  input: TargetArgs;
};


export type QueryAvgTargetRoundArgs = {
  input: TargetArgs;
};


export type QueryTeamsArgs = {
  input?: Maybe<TeamArgs>;
};


export type QueryTeamArgs = {
  input?: Maybe<TeamArgs>;
};


export type QueryTeamStatArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  input: UserArgs;
};


export type QueryUserArgs = {
  input: UserArgs;
};


export type QueryStandingArgs = {
  team: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  profileImage?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'Response';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Result = {
  __typename?: 'Result';
  success?: Maybe<Array<Response>>;
  errors?: Maybe<Array<Response>>;
};

export type Stadium = {
  __typename?: 'Stadium';
  id: Scalars['String'];
  team: Array<Team>;
  name?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  playingSurface?: Maybe<Scalars['String']>;
};

export type Standings = {
  __typename?: 'Standings';
  team: Team;
  wins: Scalars['Float'];
  losses: Scalars['Float'];
  ties: Scalars['Float'];
  divisionWins: Scalars['Float'];
  divisionLosses: Scalars['Float'];
  divisionTies: Scalars['Float'];
  conferenceWins: Scalars['Float'];
  conferenceLosses: Scalars['Float'];
  conferenceTies: Scalars['Float'];
  pointsFor: Scalars['Float'];
  pointsAgainst: Scalars['Float'];
  touchdowns: Scalars['Float'];
  winPercentage: Scalars['Float'];
  netPoints: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification: Notification;
};


export type SubscriptionNewNotificationArgs = {
  user: Scalars['String'];
};

export type Target = {
  __typename?: 'Target';
  id: Scalars['String'];
  user: User;
  player: Player;
  round: Scalars['Float'];
};

export type TargetArgs = {
  filterType?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['Float']>;
  user?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
};

export type TargetInput = {
  player: Scalars['Float'];
  round: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Float'];
  city: Scalars['String'];
  nickname: Scalars['String'];
  fullName: Scalars['String'];
  abbreviation: Scalars['String'];
  byeWeek: Scalars['Float'];
  logoUrl: Scalars['String'];
  primaryColor: Scalars['String'];
  secondaryColor: Scalars['String'];
  conference: Scalars['String'];
  division: Scalars['String'];
  headCoach: Scalars['String'];
  offensiveCoordinator: Scalars['String'];
  defensiveCoordinator: Scalars['String'];
  offensiveScheme: Scalars['String'];
  defensiveScheme: Scalars['String'];
  stadium: Stadium;
  standings: Standings;
  stats?: Maybe<TeamStats>;
};

export type TeamArgs = {
  filterType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  abbreviation?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  conference?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
};

export type TeamStats = {
  __typename?: 'TeamStats';
  id: Scalars['Float'];
  team?: Maybe<Team>;
  rank: Scalars['Float'];
  passRank: Scalars['Float'];
  rushRank: Scalars['Float'];
  yards: Scalars['Float'];
  plays: Scalars['Float'];
  yardsPerPlay: Scalars['Float'];
  turnovers: Scalars['Float'];
  passAttempts: Scalars['Float'];
  passCompletions: Scalars['Float'];
  passYards: Scalars['Float'];
  passTd: Scalars['Float'];
  interception: Scalars['Float'];
  netYardsPerPass: Scalars['Float'];
  rushAttempt: Scalars['Float'];
  rushYards: Scalars['Float'];
  rushTd: Scalars['Float'];
  yardsPerRush: Scalars['Float'];
  scorePercentage: Scalars['Float'];
  turnoverPercentage: Scalars['Float'];
  offensiveLineRank: Scalars['Float'];
  runningBackSoS: Scalars['Float'];
};

export type TeamStatsInput = {
  team: Scalars['Float'];
  bye: Scalars['Float'];
  rank: Scalars['Float'];
  passRank: Scalars['Float'];
  rushRank: Scalars['Float'];
  pointsFor: Scalars['Float'];
  yards: Scalars['Float'];
  plays: Scalars['Float'];
  yardsPerPlay: Scalars['Float'];
  turnovers: Scalars['Float'];
  passAttempts: Scalars['Float'];
  passCompletions: Scalars['Float'];
  passYards: Scalars['Float'];
  passTd: Scalars['Float'];
  interception: Scalars['Float'];
  netYardsPerPass: Scalars['Float'];
  rushAttempt: Scalars['Float'];
  rushYards: Scalars['Float'];
  rushTd: Scalars['Float'];
  yardsPerRush: Scalars['Float'];
  scorePercentage: Scalars['Float'];
  turnoverPercentage: Scalars['Float'];
  offensiveLineRank: Scalars['Float'];
  runningBackSoS: Scalars['Float'];
};

export type UpdateImageInput = {
  id: Scalars['String'];
  image: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  confirmed: Scalars['Boolean'];
  forgotPasswordLock: Scalars['Boolean'];
  isLoggedIn: Scalars['Boolean'];
  creationTime: Scalars['DateTime'];
  lastLoggedIn: Scalars['DateTime'];
  isAdmin: Scalars['Boolean'];
  profileImage?: Maybe<Scalars['String']>;
  folders?: Maybe<Array<Folder>>;
  targets?: Maybe<Array<Target>>;
};

export type UserArgs = {
  filterType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResult' }
    & { success?: Maybe<(
      { __typename?: 'LoginSuccess' }
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'username' | 'isAdmin' | 'profileImage'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type CreateFolderMutationVariables = Exact<{
  data: FolderArgs;
}>;


export type CreateFolderMutation = (
  { __typename?: 'Mutation' }
  & { createFolder: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type EditFolderMutationVariables = Exact<{
  data: FolderArgs;
}>;


export type EditFolderMutation = (
  { __typename?: 'Mutation' }
  & { editFolder: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type DeleteFolderMutationVariables = Exact<{
  data: FolderArgs;
}>;


export type DeleteFolderMutation = (
  { __typename?: 'Mutation' }
  & { deleteFolder: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type CreateNoteMutationVariables = Exact<{
  data: NoteInput;
  references: Array<PlayerReferenceInput> | PlayerReferenceInput;
}>;


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createNote: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type EditNoteMutationVariables = Exact<{
  data: NoteInput;
}>;


export type EditNoteMutation = (
  { __typename?: 'Mutation' }
  & { editNote: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type DeleteNoteMutationVariables = Exact<{
  data: DeleteNoteInput;
}>;


export type DeleteNoteMutation = (
  { __typename?: 'Mutation' }
  & { deleteNote: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type UpdatePlayersMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdatePlayersMutation = (
  { __typename?: 'Mutation' }
  & { updatePlayers: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type CreateProjectionMutationVariables = Exact<{
  data: ProjectionInput;
}>;


export type CreateProjectionMutation = (
  { __typename?: 'Mutation' }
  & { createProjection: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type UpdateStadiumMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateStadiumMutation = (
  { __typename?: 'Mutation' }
  & { updateStadiums: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type UpdateStandingsMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateStandingsMutation = (
  { __typename?: 'Mutation' }
  & { updateStandings: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type CreateTargetMutationVariables = Exact<{
  data: TargetInput;
}>;


export type CreateTargetMutation = (
  { __typename?: 'Mutation' }
  & { createTarget: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type DeleteTargetMutationVariables = Exact<{
  data: DeleteTargetArgs;
}>;


export type DeleteTargetMutation = (
  { __typename?: 'Mutation' }
  & { deleteTarget: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type AddTeamStatsMutationVariables = Exact<{
  data: TeamStatsInput;
}>;


export type AddTeamStatsMutation = (
  { __typename?: 'Mutation' }
  & { addTeamStats: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type UpdateTeamsMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateTeamsMutation = (
  { __typename?: 'Mutation' }
  & { updateTeams: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type UpdateUserProfileImageMutationVariables = Exact<{
  data: UpdateImageInput;
}>;


export type UpdateUserProfileImageMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfileImage: (
    { __typename?: 'Result' }
    & { success?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'Response' }
      & Pick<Response, 'message'>
    )>> }
  ) }
);

export type FoldersQueryVariables = Exact<{
  data: FolderArgs;
}>;


export type FoldersQuery = (
  { __typename?: 'Query' }
  & { folders: Array<(
    { __typename?: 'Folder' }
    & Pick<Folder, 'id' | 'title' | 'creationTime' | 'updatedTime'>
    & { notes?: Maybe<Array<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'creationTime' | 'updatedTime'>
    )>> }
  )> }
);

export type FolderQueryVariables = Exact<{
  data: FolderArgs;
}>;


export type FolderQuery = (
  { __typename?: 'Query' }
  & { folder: (
    { __typename?: 'Folder' }
    & Pick<Folder, 'id' | 'title' | 'creationTime' | 'updatedTime'>
    & { notes?: Maybe<Array<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'creationTime' | 'updatedTime'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profileImage' | 'isAdmin'>
  )> }
);

export type NotesQueryVariables = Exact<{
  data: NoteArgs;
}>;


export type NotesQuery = (
  { __typename?: 'Query' }
  & { notes: Array<(
    { __typename?: 'Note' }
    & Pick<Note, 'id' | 'title' | 'body' | 'isPrivate' | 'creationTime' | 'updatedTime'>
    & { folder?: Maybe<(
      { __typename?: 'Folder' }
      & Pick<Folder, 'id' | 'title'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profileImage'>
    ), references?: Maybe<Array<(
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'name' | 'position'>
    )>> }
  )> }
);

export type NoteQueryVariables = Exact<{
  data: NoteArgs;
}>;


export type NoteQuery = (
  { __typename?: 'Query' }
  & { note: (
    { __typename?: 'Note' }
    & Pick<Note, 'id' | 'title' | 'body' | 'isPrivate' | 'creationTime' | 'updatedTime'>
    & { folder?: Maybe<(
      { __typename?: 'Folder' }
      & Pick<Folder, 'id' | 'title'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profileImage'>
    ), references?: Maybe<Array<(
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'name' | 'position'>
    )>> }
  ) }
);

export type PlayersQueryVariables = Exact<{
  data: PlayerArgs;
}>;


export type PlayersQuery = (
  { __typename?: 'Query' }
  & { players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'name' | 'initialName' | 'status' | 'position' | 'height' | 'weight' | 'averageDraftPosition' | 'depthChart' | 'birthDate' | 'college' | 'photoUrl' | 'draftYear' | 'draftRound' | 'draftPick'>
    & { projection?: Maybe<(
      { __typename?: 'Projection' }
      & Pick<Projection, 'id' | 'completions' | 'attempts' | 'passTd' | 'passYards' | 'interception' | 'carries' | 'rushYards' | 'rushTd' | 'fumbles' | 'receptions' | 'receivingYards' | 'receivingTd' | 'touches' | 'halfPPRTotalPoints' | 'pprTotalPoints' | 'totalPoints' | 'completionPercentage' | 'yardsPerAttempt' | 'yardsPerCarry' | 'yardsPerReception'>
    )>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'city' | 'nickname' | 'abbreviation' | 'fullName' | 'primaryColor' | 'secondaryColor'>
      & { stats?: Maybe<(
        { __typename?: 'TeamStats' }
        & Pick<TeamStats, 'id' | 'rank' | 'passRank' | 'rushRank' | 'plays' | 'yardsPerPlay' | 'turnovers' | 'passAttempts' | 'rushAttempt' | 'scorePercentage' | 'turnoverPercentage' | 'offensiveLineRank' | 'runningBackSoS'>
      )>, stadium: (
        { __typename?: 'Stadium' }
        & Pick<Stadium, 'id' | 'name' | 'type' | 'playingSurface' | 'city' | 'state' | 'country'>
      ), standings: (
        { __typename?: 'Standings' }
        & Pick<Standings, 'wins' | 'losses' | 'ties' | 'conferenceWins' | 'conferenceTies' | 'conferenceLosses' | 'divisionWins' | 'divisionTies' | 'divisionLosses' | 'winPercentage'>
      ) }
    )>, news?: Maybe<Array<(
      { __typename?: 'News' }
      & Pick<News, 'id' | 'title' | 'content' | 'originalSource' | 'originalSourceUrl' | 'updated'>
    )>> }
  )> }
);

export type PlayerQueryVariables = Exact<{
  data: PlayerArgs;
}>;


export type PlayerQuery = (
  { __typename?: 'Query' }
  & { player: (
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'name' | 'status' | 'position' | 'height' | 'weight' | 'averageDraftPosition' | 'depthChart' | 'birthDate' | 'age' | 'college' | 'photoUrl' | 'draftYear' | 'draftRound' | 'draftPick'>
    & { projection?: Maybe<(
      { __typename?: 'Projection' }
      & Pick<Projection, 'id' | 'completions' | 'attempts' | 'passTd' | 'passYards' | 'interception' | 'carries' | 'rushYards' | 'rushTd' | 'fumbles' | 'receptions' | 'receivingYards' | 'receivingTd' | 'touches' | 'halfPPRTotalPoints' | 'pprTotalPoints' | 'totalPoints' | 'completionPercentage' | 'yardsPerAttempt' | 'yardsPerCarry' | 'yardsPerReception'>
    )>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'city' | 'abbreviation' | 'fullName' | 'primaryColor' | 'secondaryColor'>
      & { stats?: Maybe<(
        { __typename?: 'TeamStats' }
        & Pick<TeamStats, 'id' | 'rank' | 'passRank' | 'rushRank' | 'plays' | 'yardsPerPlay' | 'turnovers' | 'passAttempts' | 'rushAttempt' | 'scorePercentage' | 'turnoverPercentage' | 'offensiveLineRank' | 'runningBackSoS'>
      )>, stadium: (
        { __typename?: 'Stadium' }
        & Pick<Stadium, 'id' | 'name' | 'type' | 'playingSurface' | 'city' | 'state' | 'country'>
      ), standings: (
        { __typename?: 'Standings' }
        & Pick<Standings, 'wins' | 'losses' | 'ties' | 'conferenceWins' | 'conferenceTies' | 'conferenceLosses' | 'divisionWins' | 'divisionTies' | 'divisionLosses' | 'winPercentage'>
      ) }
    )>, news?: Maybe<Array<(
      { __typename?: 'News' }
      & Pick<News, 'id' | 'title' | 'content' | 'originalSource' | 'originalSourceUrl' | 'updated'>
    )>> }
  ) }
);

export type TargetsQueryVariables = Exact<{
  data: TargetArgs;
}>;


export type TargetsQuery = (
  { __typename?: 'Query' }
  & { targets: Array<(
    { __typename?: 'Target' }
    & Pick<Target, 'id' | 'round'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), player: (
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'name' | 'position' | 'photoUrl'>
      & { team?: Maybe<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'abbreviation'>
      )> }
    ) }
  )> }
);

export type TargetQueryVariables = Exact<{
  data: TargetArgs;
}>;


export type TargetQuery = (
  { __typename?: 'Query' }
  & { target: (
    { __typename?: 'Target' }
    & Pick<Target, 'id' | 'round'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), player: (
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'name' | 'position' | 'photoUrl'>
      & { team?: Maybe<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'abbreviation'>
      )> }
    ) }
  ) }
);

export type TeamsQueryVariables = Exact<{
  data: TeamArgs;
}>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'city' | 'nickname' | 'fullName' | 'abbreviation' | 'byeWeek' | 'logoUrl' | 'primaryColor' | 'secondaryColor' | 'conference' | 'division' | 'headCoach' | 'offensiveCoordinator' | 'defensiveCoordinator' | 'offensiveScheme' | 'defensiveScheme'>
    & { stats?: Maybe<(
      { __typename?: 'TeamStats' }
      & Pick<TeamStats, 'rank' | 'passRank' | 'rushRank' | 'yards' | 'plays' | 'yardsPerPlay' | 'turnovers' | 'passAttempts' | 'passCompletions' | 'passYards' | 'passTd' | 'interception' | 'netYardsPerPass' | 'rushAttempt' | 'rushYards' | 'rushTd' | 'yardsPerRush' | 'scorePercentage' | 'turnoverPercentage' | 'offensiveLineRank' | 'runningBackSoS'>
    )>, stadium: (
      { __typename?: 'Stadium' }
      & Pick<Stadium, 'name' | 'type' | 'playingSurface' | 'city' | 'state' | 'country'>
    ), standings: (
      { __typename?: 'Standings' }
      & Pick<Standings, 'wins' | 'losses' | 'ties' | 'conferenceWins' | 'conferenceTies' | 'conferenceLosses' | 'divisionWins' | 'divisionTies' | 'divisionLosses' | 'winPercentage'>
    ) }
  )> }
);

export type TeamQueryVariables = Exact<{
  data: TeamArgs;
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'city' | 'nickname' | 'fullName' | 'abbreviation' | 'byeWeek' | 'logoUrl' | 'primaryColor' | 'secondaryColor' | 'conference' | 'division' | 'headCoach' | 'offensiveCoordinator' | 'defensiveCoordinator' | 'offensiveScheme' | 'defensiveScheme'>
    & { stats?: Maybe<(
      { __typename?: 'TeamStats' }
      & Pick<TeamStats, 'id' | 'rank' | 'passRank' | 'rushRank' | 'yards' | 'plays' | 'yardsPerPlay' | 'turnovers' | 'passAttempts' | 'passCompletions' | 'passYards' | 'passTd' | 'interception' | 'netYardsPerPass' | 'rushAttempt' | 'rushYards' | 'rushTd' | 'yardsPerRush' | 'scorePercentage' | 'turnoverPercentage' | 'offensiveLineRank' | 'runningBackSoS'>
    )>, stadium: (
      { __typename?: 'Stadium' }
      & Pick<Stadium, 'id' | 'name' | 'type' | 'playingSurface' | 'city' | 'state' | 'country'>
    ), standings: (
      { __typename?: 'Standings' }
      & Pick<Standings, 'wins' | 'losses' | 'ties' | 'conferenceWins' | 'conferenceTies' | 'conferenceLosses' | 'divisionWins' | 'divisionTies' | 'divisionLosses' | 'winPercentage'>
    ) }
  ) }
);

export type UsersQueryVariables = Exact<{
  data: UserArgs;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profileImage'>
  )> }
);

export type AdminUsersQueryVariables = Exact<{
  data: UserArgs;
}>;


export type AdminUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'password' | 'username' | 'confirmed' | 'forgotPasswordLock' | 'isLoggedIn' | 'creationTime' | 'lastLoggedIn' | 'isAdmin'>
  )> }
);

export type UserQueryVariables = Exact<{
  data: UserArgs;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profileImage'>
  ) }
);

export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(input: $data) {
    success {
      user {
        id
        email
        username
        isAdmin
        profileImage
      }
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation register($data: RegisterInput!) {
  register(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    mutation logout {
  logout {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateFolderDocument = gql`
    mutation createFolder($data: FolderArgs!) {
  createFolder(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFolderGQL extends Apollo.Mutation<CreateFolderMutation, CreateFolderMutationVariables> {
    document = CreateFolderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditFolderDocument = gql`
    mutation editFolder($data: FolderArgs!) {
  editFolder(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditFolderGQL extends Apollo.Mutation<EditFolderMutation, EditFolderMutationVariables> {
    document = EditFolderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteFolderDocument = gql`
    mutation deleteFolder($data: FolderArgs!) {
  deleteFolder(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteFolderGQL extends Apollo.Mutation<DeleteFolderMutation, DeleteFolderMutationVariables> {
    document = DeleteFolderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateNoteDocument = gql`
    mutation createNote($data: NoteInput!, $references: [PlayerReferenceInput!]!) {
  createNote(input: $data, references: $references) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateNoteGQL extends Apollo.Mutation<CreateNoteMutation, CreateNoteMutationVariables> {
    document = CreateNoteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditNoteDocument = gql`
    mutation editNote($data: NoteInput!) {
  editNote(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditNoteGQL extends Apollo.Mutation<EditNoteMutation, EditNoteMutationVariables> {
    document = EditNoteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteNoteDocument = gql`
    mutation deleteNote($data: DeleteNoteInput!) {
  deleteNote(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteNoteGQL extends Apollo.Mutation<DeleteNoteMutation, DeleteNoteMutationVariables> {
    document = DeleteNoteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePlayersDocument = gql`
    mutation updatePlayers {
  updatePlayers {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePlayersGQL extends Apollo.Mutation<UpdatePlayersMutation, UpdatePlayersMutationVariables> {
    document = UpdatePlayersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateProjectionDocument = gql`
    mutation createProjection($data: ProjectionInput!) {
  createProjection(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProjectionGQL extends Apollo.Mutation<CreateProjectionMutation, CreateProjectionMutationVariables> {
    document = CreateProjectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateStadiumDocument = gql`
    mutation updateStadium {
  updateStadiums {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateStadiumGQL extends Apollo.Mutation<UpdateStadiumMutation, UpdateStadiumMutationVariables> {
    document = UpdateStadiumDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateStandingsDocument = gql`
    mutation updateStandings {
  updateStandings {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateStandingsGQL extends Apollo.Mutation<UpdateStandingsMutation, UpdateStandingsMutationVariables> {
    document = UpdateStandingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTargetDocument = gql`
    mutation createTarget($data: TargetInput!) {
  createTarget(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTargetGQL extends Apollo.Mutation<CreateTargetMutation, CreateTargetMutationVariables> {
    document = CreateTargetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTargetDocument = gql`
    mutation deleteTarget($data: DeleteTargetArgs!) {
  deleteTarget(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTargetGQL extends Apollo.Mutation<DeleteTargetMutation, DeleteTargetMutationVariables> {
    document = DeleteTargetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddTeamStatsDocument = gql`
    mutation addTeamStats($data: TeamStatsInput!) {
  addTeamStats(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddTeamStatsGQL extends Apollo.Mutation<AddTeamStatsMutation, AddTeamStatsMutationVariables> {
    document = AddTeamStatsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTeamsDocument = gql`
    mutation updateTeams {
  updateTeams {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTeamsGQL extends Apollo.Mutation<UpdateTeamsMutation, UpdateTeamsMutationVariables> {
    document = UpdateTeamsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserProfileImageDocument = gql`
    mutation updateUserProfileImage($data: UpdateImageInput!) {
  updateUserProfileImage(input: $data) {
    success {
      message
    }
    errors {
      message
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserProfileImageGQL extends Apollo.Mutation<UpdateUserProfileImageMutation, UpdateUserProfileImageMutationVariables> {
    document = UpdateUserProfileImageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FoldersDocument = gql`
    query folders($data: FolderArgs!) {
  folders(input: $data) {
    id
    title
    creationTime
    updatedTime
    notes {
      id
      title
      creationTime
      updatedTime
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FoldersGQL extends Apollo.Query<FoldersQuery, FoldersQueryVariables> {
    document = FoldersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FolderDocument = gql`
    query folder($data: FolderArgs!) {
  folder(input: $data) {
    id
    title
    creationTime
    updatedTime
    notes {
      id
      title
      creationTime
      updatedTime
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FolderGQL extends Apollo.Query<FolderQuery, FolderQueryVariables> {
    document = FolderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
    profileImage
    isAdmin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NotesDocument = gql`
    query notes($data: NoteArgs!) {
  notes(input: $data) {
    id
    title
    body
    folder {
      id
      title
    }
    isPrivate
    creationTime
    updatedTime
    user {
      id
      username
      profileImage
    }
    references {
      id
      name
      position
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NotesGQL extends Apollo.Query<NotesQuery, NotesQueryVariables> {
    document = NotesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NoteDocument = gql`
    query note($data: NoteArgs!) {
  note(input: $data) {
    id
    title
    body
    folder {
      id
      title
    }
    isPrivate
    creationTime
    updatedTime
    user {
      id
      username
      profileImage
    }
    references {
      id
      name
      position
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NoteGQL extends Apollo.Query<NoteQuery, NoteQueryVariables> {
    document = NoteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PlayersDocument = gql`
    query players($data: PlayerArgs!) {
  players(input: $data) {
    id
    name
    initialName
    status
    position
    height
    weight
    averageDraftPosition
    depthChart
    birthDate
    college
    photoUrl
    draftYear
    draftRound
    draftPick
    projection {
      id
      completions
      attempts
      passTd
      passYards
      interception
      carries
      rushYards
      rushTd
      fumbles
      receptions
      receivingYards
      receivingTd
      touches
      halfPPRTotalPoints
      pprTotalPoints
      totalPoints
      completionPercentage
      yardsPerAttempt
      yardsPerCarry
      yardsPerReception
    }
    team {
      id
      city
      nickname
      abbreviation
      fullName
      primaryColor
      secondaryColor
      stats {
        id
        rank
        passRank
        rushRank
        plays
        yardsPerPlay
        turnovers
        passAttempts
        rushAttempt
        scorePercentage
        turnoverPercentage
        offensiveLineRank
        runningBackSoS
      }
      stadium {
        id
        name
        type
        playingSurface
        city
        state
        country
      }
      standings {
        wins
        losses
        ties
        conferenceWins
        conferenceTies
        conferenceLosses
        divisionWins
        divisionTies
        divisionLosses
        winPercentage
      }
    }
    news {
      id
      title
      content
      originalSource
      originalSourceUrl
      updated
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PlayersGQL extends Apollo.Query<PlayersQuery, PlayersQueryVariables> {
    document = PlayersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PlayerDocument = gql`
    query player($data: PlayerArgs!) {
  player(input: $data) {
    id
    name
    status
    position
    height
    weight
    averageDraftPosition
    depthChart
    birthDate
    age
    college
    photoUrl
    draftYear
    draftRound
    draftPick
    projection {
      id
      completions
      attempts
      passTd
      passYards
      interception
      carries
      rushYards
      rushTd
      fumbles
      receptions
      receivingYards
      receivingTd
      touches
      halfPPRTotalPoints
      pprTotalPoints
      totalPoints
      completionPercentage
      yardsPerAttempt
      yardsPerCarry
      yardsPerReception
    }
    team {
      id
      city
      abbreviation
      fullName
      primaryColor
      secondaryColor
      stats {
        id
        rank
        passRank
        rushRank
        plays
        yardsPerPlay
        turnovers
        passAttempts
        rushAttempt
        scorePercentage
        turnoverPercentage
        offensiveLineRank
        runningBackSoS
      }
      stadium {
        id
        name
        type
        playingSurface
        city
        state
        country
      }
      standings {
        wins
        losses
        ties
        conferenceWins
        conferenceTies
        conferenceLosses
        divisionWins
        divisionTies
        divisionLosses
        winPercentage
      }
    }
    news {
      id
      title
      content
      originalSource
      originalSourceUrl
      updated
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PlayerGQL extends Apollo.Query<PlayerQuery, PlayerQueryVariables> {
    document = PlayerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TargetsDocument = gql`
    query targets($data: TargetArgs!) {
  targets(input: $data) {
    id
    round
    user {
      id
      username
    }
    player {
      id
      name
      position
      photoUrl
      team {
        id
        abbreviation
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TargetsGQL extends Apollo.Query<TargetsQuery, TargetsQueryVariables> {
    document = TargetsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TargetDocument = gql`
    query target($data: TargetArgs!) {
  target(input: $data) {
    id
    round
    user {
      id
      username
    }
    player {
      id
      name
      position
      photoUrl
      team {
        id
        abbreviation
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TargetGQL extends Apollo.Query<TargetQuery, TargetQueryVariables> {
    document = TargetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TeamsDocument = gql`
    query teams($data: TeamArgs!) {
  teams(input: $data) {
    id
    city
    nickname
    fullName
    abbreviation
    byeWeek
    logoUrl
    primaryColor
    secondaryColor
    conference
    division
    headCoach
    offensiveCoordinator
    defensiveCoordinator
    offensiveScheme
    defensiveScheme
    stats {
      rank
      passRank
      rushRank
      yards
      plays
      yardsPerPlay
      turnovers
      passAttempts
      passCompletions
      passYards
      passTd
      interception
      netYardsPerPass
      rushAttempt
      rushYards
      rushTd
      yardsPerRush
      scorePercentage
      turnoverPercentage
      offensiveLineRank
      runningBackSoS
    }
    stadium {
      name
      type
      playingSurface
      city
      state
      country
    }
    standings {
      wins
      losses
      ties
      conferenceWins
      conferenceTies
      conferenceLosses
      divisionWins
      divisionTies
      divisionLosses
      winPercentage
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamsGQL extends Apollo.Query<TeamsQuery, TeamsQueryVariables> {
    document = TeamsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TeamDocument = gql`
    query team($data: TeamArgs!) {
  team(input: $data) {
    id
    city
    nickname
    fullName
    abbreviation
    byeWeek
    logoUrl
    primaryColor
    secondaryColor
    conference
    division
    headCoach
    offensiveCoordinator
    defensiveCoordinator
    offensiveScheme
    defensiveScheme
    stats {
      id
      rank
      passRank
      rushRank
      yards
      plays
      yardsPerPlay
      turnovers
      passAttempts
      passCompletions
      passYards
      passTd
      interception
      netYardsPerPass
      rushAttempt
      rushYards
      rushTd
      yardsPerRush
      scorePercentage
      turnoverPercentage
      offensiveLineRank
      runningBackSoS
    }
    stadium {
      id
      name
      type
      playingSurface
      city
      state
      country
    }
    standings {
      wins
      losses
      ties
      conferenceWins
      conferenceTies
      conferenceLosses
      divisionWins
      divisionTies
      divisionLosses
      winPercentage
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamGQL extends Apollo.Query<TeamQuery, TeamQueryVariables> {
    document = TeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersDocument = gql`
    query users($data: UserArgs!) {
  users(input: $data) {
    id
    username
    email
    profileImage
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AdminUsersDocument = gql`
    query adminUsers($data: UserArgs!) {
  users(input: $data) {
    id
    email
    password
    username
    confirmed
    forgotPasswordLock
    isLoggedIn
    creationTime
    lastLoggedIn
    isAdmin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AdminUsersGQL extends Apollo.Query<AdminUsersQuery, AdminUsersQueryVariables> {
    document = AdminUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query user($data: UserArgs!) {
  user(input: $data) {
    id
    username
    email
    profileImage
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V>
    extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}
    
  interface QueryOptionsAlone<V>
    extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}
    
  interface MutationOptionsAlone<T, V>
    extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}
    
  interface SubscriptionOptionsAlone<V>
    extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class ApolloAngularSDK {
    constructor(
      private loginGql: LoginGQL,
      private registerGql: RegisterGQL,
      private logoutGql: LogoutGQL,
      private createFolderGql: CreateFolderGQL,
      private editFolderGql: EditFolderGQL,
      private deleteFolderGql: DeleteFolderGQL,
      private createNoteGql: CreateNoteGQL,
      private editNoteGql: EditNoteGQL,
      private deleteNoteGql: DeleteNoteGQL,
      private updatePlayersGql: UpdatePlayersGQL,
      private createProjectionGql: CreateProjectionGQL,
      private updateStadiumGql: UpdateStadiumGQL,
      private updateStandingsGql: UpdateStandingsGQL,
      private createTargetGql: CreateTargetGQL,
      private deleteTargetGql: DeleteTargetGQL,
      private addTeamStatsGql: AddTeamStatsGQL,
      private updateTeamsGql: UpdateTeamsGQL,
      private updateUserProfileImageGql: UpdateUserProfileImageGQL,
      private foldersGql: FoldersGQL,
      private folderGql: FolderGQL,
      private meGql: MeGQL,
      private notesGql: NotesGQL,
      private noteGql: NoteGQL,
      private playersGql: PlayersGQL,
      private playerGql: PlayerGQL,
      private targetsGql: TargetsGQL,
      private targetGql: TargetGQL,
      private teamsGql: TeamsGQL,
      private teamGql: TeamGQL,
      private usersGql: UsersGQL,
      private adminUsersGql: AdminUsersGQL,
      private userGql: UserGQL
    ) {}
      
    login(variables: LoginMutationVariables, options?: MutationOptionsAlone<LoginMutation, LoginMutationVariables>) {
      return this.loginGql.mutate(variables, options)
    }
    
    register(variables: RegisterMutationVariables, options?: MutationOptionsAlone<RegisterMutation, RegisterMutationVariables>) {
      return this.registerGql.mutate(variables, options)
    }
    
    logout(variables?: LogoutMutationVariables, options?: MutationOptionsAlone<LogoutMutation, LogoutMutationVariables>) {
      return this.logoutGql.mutate(variables, options)
    }
    
    createFolder(variables: CreateFolderMutationVariables, options?: MutationOptionsAlone<CreateFolderMutation, CreateFolderMutationVariables>) {
      return this.createFolderGql.mutate(variables, options)
    }
    
    editFolder(variables: EditFolderMutationVariables, options?: MutationOptionsAlone<EditFolderMutation, EditFolderMutationVariables>) {
      return this.editFolderGql.mutate(variables, options)
    }
    
    deleteFolder(variables: DeleteFolderMutationVariables, options?: MutationOptionsAlone<DeleteFolderMutation, DeleteFolderMutationVariables>) {
      return this.deleteFolderGql.mutate(variables, options)
    }
    
    createNote(variables: CreateNoteMutationVariables, options?: MutationOptionsAlone<CreateNoteMutation, CreateNoteMutationVariables>) {
      return this.createNoteGql.mutate(variables, options)
    }
    
    editNote(variables: EditNoteMutationVariables, options?: MutationOptionsAlone<EditNoteMutation, EditNoteMutationVariables>) {
      return this.editNoteGql.mutate(variables, options)
    }
    
    deleteNote(variables: DeleteNoteMutationVariables, options?: MutationOptionsAlone<DeleteNoteMutation, DeleteNoteMutationVariables>) {
      return this.deleteNoteGql.mutate(variables, options)
    }
    
    updatePlayers(variables?: UpdatePlayersMutationVariables, options?: MutationOptionsAlone<UpdatePlayersMutation, UpdatePlayersMutationVariables>) {
      return this.updatePlayersGql.mutate(variables, options)
    }
    
    createProjection(variables: CreateProjectionMutationVariables, options?: MutationOptionsAlone<CreateProjectionMutation, CreateProjectionMutationVariables>) {
      return this.createProjectionGql.mutate(variables, options)
    }
    
    updateStadium(variables?: UpdateStadiumMutationVariables, options?: MutationOptionsAlone<UpdateStadiumMutation, UpdateStadiumMutationVariables>) {
      return this.updateStadiumGql.mutate(variables, options)
    }
    
    updateStandings(variables?: UpdateStandingsMutationVariables, options?: MutationOptionsAlone<UpdateStandingsMutation, UpdateStandingsMutationVariables>) {
      return this.updateStandingsGql.mutate(variables, options)
    }
    
    createTarget(variables: CreateTargetMutationVariables, options?: MutationOptionsAlone<CreateTargetMutation, CreateTargetMutationVariables>) {
      return this.createTargetGql.mutate(variables, options)
    }
    
    deleteTarget(variables: DeleteTargetMutationVariables, options?: MutationOptionsAlone<DeleteTargetMutation, DeleteTargetMutationVariables>) {
      return this.deleteTargetGql.mutate(variables, options)
    }
    
    addTeamStats(variables: AddTeamStatsMutationVariables, options?: MutationOptionsAlone<AddTeamStatsMutation, AddTeamStatsMutationVariables>) {
      return this.addTeamStatsGql.mutate(variables, options)
    }
    
    updateTeams(variables?: UpdateTeamsMutationVariables, options?: MutationOptionsAlone<UpdateTeamsMutation, UpdateTeamsMutationVariables>) {
      return this.updateTeamsGql.mutate(variables, options)
    }
    
    updateUserProfileImage(variables: UpdateUserProfileImageMutationVariables, options?: MutationOptionsAlone<UpdateUserProfileImageMutation, UpdateUserProfileImageMutationVariables>) {
      return this.updateUserProfileImageGql.mutate(variables, options)
    }
    
    folders(variables: FoldersQueryVariables, options?: QueryOptionsAlone<FoldersQueryVariables>) {
      return this.foldersGql.fetch(variables, options)
    }
    
    foldersWatch(variables: FoldersQueryVariables, options?: WatchQueryOptionsAlone<FoldersQueryVariables>) {
      return this.foldersGql.watch(variables, options)
    }
    
    folder(variables: FolderQueryVariables, options?: QueryOptionsAlone<FolderQueryVariables>) {
      return this.folderGql.fetch(variables, options)
    }
    
    folderWatch(variables: FolderQueryVariables, options?: WatchQueryOptionsAlone<FolderQueryVariables>) {
      return this.folderGql.watch(variables, options)
    }
    
    me(variables?: MeQueryVariables, options?: QueryOptionsAlone<MeQueryVariables>) {
      return this.meGql.fetch(variables, options)
    }
    
    meWatch(variables?: MeQueryVariables, options?: WatchQueryOptionsAlone<MeQueryVariables>) {
      return this.meGql.watch(variables, options)
    }
    
    notes(variables: NotesQueryVariables, options?: QueryOptionsAlone<NotesQueryVariables>) {
      return this.notesGql.fetch(variables, options)
    }
    
    notesWatch(variables: NotesQueryVariables, options?: WatchQueryOptionsAlone<NotesQueryVariables>) {
      return this.notesGql.watch(variables, options)
    }
    
    note(variables: NoteQueryVariables, options?: QueryOptionsAlone<NoteQueryVariables>) {
      return this.noteGql.fetch(variables, options)
    }
    
    noteWatch(variables: NoteQueryVariables, options?: WatchQueryOptionsAlone<NoteQueryVariables>) {
      return this.noteGql.watch(variables, options)
    }
    
    players(variables: PlayersQueryVariables, options?: QueryOptionsAlone<PlayersQueryVariables>) {
      return this.playersGql.fetch(variables, options)
    }
    
    playersWatch(variables: PlayersQueryVariables, options?: WatchQueryOptionsAlone<PlayersQueryVariables>) {
      return this.playersGql.watch(variables, options)
    }
    
    player(variables: PlayerQueryVariables, options?: QueryOptionsAlone<PlayerQueryVariables>) {
      return this.playerGql.fetch(variables, options)
    }
    
    playerWatch(variables: PlayerQueryVariables, options?: WatchQueryOptionsAlone<PlayerQueryVariables>) {
      return this.playerGql.watch(variables, options)
    }
    
    targets(variables: TargetsQueryVariables, options?: QueryOptionsAlone<TargetsQueryVariables>) {
      return this.targetsGql.fetch(variables, options)
    }
    
    targetsWatch(variables: TargetsQueryVariables, options?: WatchQueryOptionsAlone<TargetsQueryVariables>) {
      return this.targetsGql.watch(variables, options)
    }
    
    target(variables: TargetQueryVariables, options?: QueryOptionsAlone<TargetQueryVariables>) {
      return this.targetGql.fetch(variables, options)
    }
    
    targetWatch(variables: TargetQueryVariables, options?: WatchQueryOptionsAlone<TargetQueryVariables>) {
      return this.targetGql.watch(variables, options)
    }
    
    teams(variables: TeamsQueryVariables, options?: QueryOptionsAlone<TeamsQueryVariables>) {
      return this.teamsGql.fetch(variables, options)
    }
    
    teamsWatch(variables: TeamsQueryVariables, options?: WatchQueryOptionsAlone<TeamsQueryVariables>) {
      return this.teamsGql.watch(variables, options)
    }
    
    team(variables: TeamQueryVariables, options?: QueryOptionsAlone<TeamQueryVariables>) {
      return this.teamGql.fetch(variables, options)
    }
    
    teamWatch(variables: TeamQueryVariables, options?: WatchQueryOptionsAlone<TeamQueryVariables>) {
      return this.teamGql.watch(variables, options)
    }
    
    users(variables: UsersQueryVariables, options?: QueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.fetch(variables, options)
    }
    
    usersWatch(variables: UsersQueryVariables, options?: WatchQueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.watch(variables, options)
    }
    
    adminUsers(variables: AdminUsersQueryVariables, options?: QueryOptionsAlone<AdminUsersQueryVariables>) {
      return this.adminUsersGql.fetch(variables, options)
    }
    
    adminUsersWatch(variables: AdminUsersQueryVariables, options?: WatchQueryOptionsAlone<AdminUsersQueryVariables>) {
      return this.adminUsersGql.watch(variables, options)
    }
    
    user(variables: UserQueryVariables, options?: QueryOptionsAlone<UserQueryVariables>) {
      return this.userGql.fetch(variables, options)
    }
    
    userWatch(variables: UserQueryVariables, options?: WatchQueryOptionsAlone<UserQueryVariables>) {
      return this.userGql.watch(variables, options)
    }
  }
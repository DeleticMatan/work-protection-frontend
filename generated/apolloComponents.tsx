export type Maybe<T> = T | null;

export interface RegisterInput {
  firstName: string;

  lastName: string;

  companyName: string;

  email: string;

  password: string;
}

export interface UpdateUserInput {
  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  companyName?: Maybe<string>;

  email?: Maybe<string>;

  isActive?: Maybe<boolean>;

  password?: Maybe<string>;
}
/** Course status for given user. If there is no info in DB, default is 'UNWATCHED'. */
export enum Status {
  Unwatched = "UNWATCHED",
  Watched = "WATCHED",
  Passed = "PASSED"
}

// ====================================================
// Documents
// ====================================================

export type DeleteUserVariables = {
  id: string;
};

export type DeleteUserMutation = {
  __typename?: "Mutation";

  deleteUser: DeleteUserDeleteUser;
};

export type DeleteUserDeleteUser = {
  __typename?: "User";

  id: string;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: LoginLogin;
};

export type LoginLogin = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  companyName: string;

  email: string;

  isActive: boolean;

  isAdmin: boolean;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type RegisterVariables = {
  data: RegisterInput;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  companyName: string;

  email: string;

  isActive: boolean;

  isAdmin: boolean;
};

export type UpdateUserVariables = {
  id: string;
  data: UpdateUserInput;
};

export type UpdateUserMutation = {
  __typename?: "Mutation";

  updateUser: UpdateUserUpdateUser;
};

export type UpdateUserUpdateUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  companyName: string;

  email: string;

  isActive: boolean;

  isAdmin: boolean;
};

export type CoursesVariables = {
  id?: Maybe<string>;
};

export type CoursesQuery = {
  __typename?: "Query";

  courses: CoursesCourses[];
};

export type CoursesCourses = {
  __typename?: "Course";

  id: string;

  title: string;

  description: string;

  duration: string;

  thumbnail: string;

  vimeoId: string;

  status: Status;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  companyName: string;

  email: string;

  isActive: boolean;

  isAdmin: boolean;
};

export type UsersVariables = {
  id?: Maybe<string>;
};

export type UsersQuery = {
  __typename?: "Query";

  users: UsersUsers[];
};

export type UsersUsers = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  companyName: string;

  email: string;

  isActive: boolean;

  isAdmin: boolean;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

// ====================================================
// Components
// ====================================================

export const DeleteUserDocument = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
export class DeleteUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<DeleteUserMutation, DeleteUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteUserMutation, DeleteUserVariables>
        mutation={DeleteUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteUserMutation, DeleteUserVariables>
> &
  TChildProps;
export type DeleteUserMutationFn = ReactApollo.MutationFn<
  DeleteUserMutation,
  DeleteUserVariables
>;
export function DeleteUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteUserMutation,
        DeleteUserVariables,
        DeleteUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteUserMutation,
    DeleteUserVariables,
    DeleteUserProps<TChildProps>
  >(DeleteUserDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
      isAdmin
    }
  }
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
      isAdmin
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
      isAdmin
    }
  }
`;
export class UpdateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateUserMutation, UpdateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateUserMutation, UpdateUserVariables>
        mutation={UpdateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateUserMutation, UpdateUserVariables>
> &
  TChildProps;
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserVariables
>;
export function UpdateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateUserMutation,
        UpdateUserVariables,
        UpdateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateUserMutation,
    UpdateUserVariables,
    UpdateUserProps<TChildProps>
  >(UpdateUserDocument, operationOptions);
}
export const CoursesDocument = gql`
  query Courses($id: ID) {
    courses(id: $id) {
      id
      title
      description
      duration
      thumbnail
      vimeoId
      status
    }
  }
`;
export class CoursesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<CoursesQuery, CoursesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<CoursesQuery, CoursesVariables>
        query={CoursesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CoursesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CoursesQuery, CoursesVariables>
> &
  TChildProps;
export function CoursesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CoursesQuery,
        CoursesVariables,
        CoursesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CoursesQuery,
    CoursesVariables,
    CoursesProps<TChildProps>
  >(CoursesDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
      isAdmin
    }
  }
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
export const UsersDocument = gql`
  query Users($id: ID) {
    users(id: $id) {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
      isAdmin
    }
  }
`;
export class UsersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<UsersQuery, UsersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<UsersQuery, UsersVariables>
        query={UsersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UsersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UsersQuery, UsersVariables>
> &
  TChildProps;
export function UsersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UsersQuery,
        UsersVariables,
        UsersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UsersQuery,
    UsersVariables,
    UsersProps<TChildProps>
  >(UsersDocument, operationOptions);
}

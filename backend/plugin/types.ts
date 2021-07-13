export enum PluginApiError {
  NotImplemented = "not_implemented",
  Unauthorized = "unauthorized",
  MethodNotValid = "invalid_method",
  Unknown = "unknown",
}

export enum ValidateError {
  ArgumentsError = "arguments_error",
  MissingConsent = "missing_consent",
  MissingName = "missing_name",
  UuidNotValid = "uuid_not_valid",
  NotRegistered = "not_registered",
  NotInTeam = "not_in_team",
}

export enum PointsError {
  NoPlayers = "no_players",
}

export interface IApiPluginResponse<T = any> {
  content?: T;
  error?: PluginApiError | ValidateError | PointsError;
  message?: string;
}

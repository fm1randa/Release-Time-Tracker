interface ResponseObject {
  [key: string]: any;
}

type Response = ResponseObject | string | void;

type EnsureValidReturnType<T extends Response> = T;

export type RegisteredFunctions = {
  getText: {
    returnType: EnsureValidReturnType<string>;
    payloadType: {
      example: string;
    };
  };
};

export type RegisteredFunction = keyof RegisteredFunctions;

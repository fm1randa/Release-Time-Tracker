import Resolver from "@forge/resolver";
import { RegisteredFunction, RegisteredFunctions } from "./functions";

interface InvokePayload<T extends RegisteredFunction> {
  call: {
    functionKey: T;
    payload?: RegisteredFunctions[T]["payloadType"];
    jobId?: string;
  };
  context: {
    [key: string]: any;
  };
}

interface Request<T extends RegisteredFunction> {
  payload: RegisteredFunctions[T]["payloadType"];
  context: InvokePayload<T>["context"];
}

type SafeResolverFunction<T extends RegisteredFunction> = (
  request: Request<T>
) => RegisteredFunctions[T]["returnType"];

type SafeDefinitionsHandler = <T extends RegisteredFunction>(
  payload: InvokePayload<T>,
  backendRuntimePayload?: Request<T>["payload"]
) => Promise<ReturnType<SafeResolverFunction<T>>>;

export class SafeResolver extends Resolver {
  define<T extends RegisteredFunction>(
    functionKey: T,
    cb: SafeResolverFunction<T>
  ): this {
    // @ts-expect-error
    return super.define(functionKey, cb);
  }

  // @ts-expect-error
  getDefinitions(): SafeDefinitionsHandler {
    // @ts-expect-error
    return super.getDefinitions();
  }
}

import Resolver from "@forge/resolver";
import { FunctionKey, RegisteredFunctions } from "./functions";

interface InvokePayload<T extends FunctionKey> {
  call: {
    functionKey: T;
    payload?: RegisteredFunctions[T]["payloadType"];
    jobId?: string;
  };
  context: {
    [key: string]: any;
  };
}

interface Request<T extends FunctionKey> {
  payload: RegisteredFunctions[T]["payloadType"];
  context: InvokePayload<T>["context"];
}

type SafeResolverFunction<T extends FunctionKey> = (
  request: Request<T>
) => RegisteredFunctions[T]["returnType"];

type SafeDefinitionsHandler = <T extends FunctionKey>(
  payload: InvokePayload<T>,
  backendRuntimePayload?: Request<T>["payload"]
) => Promise<ReturnType<SafeResolverFunction<T>>>;

export class SafeResolver extends Resolver {
  define<T extends FunctionKey>(
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

import { invoke } from "@forge/bridge";
import { RegisteredFunction, RegisteredFunctions } from "./functions";

export function safeInvoke<T extends RegisteredFunction>(
  functionKey: T,
  payload?: RegisteredFunctions[T]["payloadType"]
): Promise<RegisteredFunctions[T]["returnType"]> {
  return invoke(functionKey, payload);
}

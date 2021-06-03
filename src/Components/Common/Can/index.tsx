import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { Ability } from "@casl/ability";

type Actions = "READ" | "EXECUTE" | "DELETE" | "REPORT" | "LOG";
export type AppAbility = Ability<[Actions, string]>;

export const AbilityContext = createContext<AppAbility>(undefined!);
export const Can = createContextualCan(AbilityContext.Consumer);

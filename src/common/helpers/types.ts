import { IPokemonResponse } from "common/models/IPokemon";

type TReplacedKeys = "stats" | "types";
type TPokemonDisplayInfoPick = "abilities" | "base_experience";

export type FormatedResult = IFormatedPokemonResponse;

export interface IDisplayFormat {
  name: string;
  value: number | string;
}

export interface IFormatedPokemonResponse
  extends Omit<IPokemonResponse, TReplacedKeys> {
  avatarUrl: string;
  types: string[];
  stats: IDisplayFormat[];
}

export type TPokemonDisplayInfo = Pick<
  IPokemonResponse,
  TPokemonDisplayInfoPick
>;

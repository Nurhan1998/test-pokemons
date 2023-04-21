import { IDisplayFormat } from "common/helpers/types";

export interface ITag {
  value: string;
  bgColor: string;
}

export interface IPokemonInfoModalProps extends Omit<IPokemonCardView, "tags"> {
  handleModalClose: () => void;
}

export interface IPokemonCardInfoProps {
  name: string;
  tags: string[];
  stats: IDisplayFormat[];
  additionalInfo: IDisplayFormat[];
}

export interface IPokemonCardView {
  avatarUrl: string;
  name: string;
  tags: string[];
  stats: IDisplayFormat[];
  additionalInfo: IDisplayFormat[];
}

export interface IPokemonCardProps extends IPokemonCardView {
  handleCardClick: () => void;
}

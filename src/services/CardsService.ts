import axios from "axios";
import { ICard, ICardsApi } from "../store/types";

class CardsService {
  private readonly API_URL = import.meta.env.CH_APP_API_URL;
  private api = axios.create({
    baseURL: this.API_URL,
  });

  public async getCard(deckId: string, count: number): Promise<ICard[]> {
    const { data } = await this.api.get<ICardsApi>(
      `/${deckId}/draw/?count=${count}`
    );
    return data.cards;
  }
}
export const cardsApi = new CardsService();

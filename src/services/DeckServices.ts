import axios from "axios";
import { ICard, ICardsApi, IDeckApi } from "../store/types";

class DeckService {
  private readonly API_URL = "https://deckofcardsapi.com/api/deck";
  private api = axios.create({
    baseURL: this.API_URL,
  });

  public async getDeck() {
    const { data } = await this.api.get<IDeckApi>("/new/shuffle/?deck_count=1");
    return data.deck_id;
  }
}
export const deckApi = new DeckService();

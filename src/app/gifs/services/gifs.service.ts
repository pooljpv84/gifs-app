import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gif, SearchResponse} from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[]=[];
  private _tagsHistory: string[] = [];
  private serviceUrl:  string = 'http://api.giphy.com/v1/gifs';
  private apiKey:      string = 'jchFn000BtsNxaUjXJDKqKj0RIoGuzZi';

  constructor(private http: HttpClient)
  {
    this.loadLocalStorage();
    console.log('Gifs Service ready');
  }


  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)
    console.log(this._tagsHistory)
    // ---------------------------------------------------------------------------------------------------------------------------------- //
    //FETCH (async: Promise<void>, await response)
    // const resp  =await fetch('https://api.giphy.com/v1/gifs/search?api_key=jchFn000BtsNxaUjXJDKqKj0RIoGuzZi&q=valorant&limit=10');
    // const data = await resp.json();
    // console.log(data)
    // ---------------------------------------------------------------------------------------------------------------------------------- //
    //OBSERVABLE
    //Observable es un obj que a lo largo del tiempo puede emitir valores; pero hay observables conitnuos cada 1ms
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params:params})
      .subscribe((resp) =>{
        this.gifList = resp.data;
        //console.log({gifs: this.gifList});
      });


  }

  private organizeHistory(tag: string)
  {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }
  private saveLocalStorage(): void
  {
    localStorage.setItem('history',JSON.stringify(this.tagsHistory));
  }
  private loadLocalStorage(): void
  {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }
}

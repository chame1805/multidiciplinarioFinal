import { Component } from '@angular/core';
import { PlacesService } from '../../service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTim? : NodeJS.Timeout

  constructor( private placesService: PlacesService){

  }

  onQueryChanged(query: string = ''){
    if(this.debounceTim)clearTimeout(this.debounceTim);

    this.debounceTim = setTimeout(()=>{
      this.placesService.getPlcesByQuery(query)
    },350)
  }


}

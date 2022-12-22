import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, OnDestroy {
  sort!: string;
  games: Array<Game>;
  private routeSub: Subscription | undefined;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { 
      this.games = []
     }

  ngOnInit(): void {
      this.routeSub=this.activatedRoute.params.subscribe((params: Params)=>{
      if (params['game-search']){
        this.searchGames('metacrit',params['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    });

    console.log('test')
  }

  searchGames(sort: string,search?:string){
    this.gameSub =this.httpService
    .getGameList(sort, search)
    .subscribe(
      (gameList: APIResponse<Game>) => {
      this.games = gameList.results;
    });
  }

  openGameDetails(name:string):void{
    this.router.navigate(['details',name]);
  }


  ngOnDestroy():void{
    if(this.games){
      this.gameSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }

    console.log('test destroy')

  }

  

}

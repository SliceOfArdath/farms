G.AddData({
name:'Farms',
author:'OscarHavril',
desc:'A simple mod that add farming. Needed for Futuristic Enginering',
engineVersion:1,
manifest:'https://rawgit.com/OscarHavril/farms/master/farmsManifest.js',
requires:['Default dataset*'],
sheets:{'cookieSheet':'https://raw.githubusercontent.com/Generatoror/hello-world/master/sprits.png'},//custom stylesheet (note : broken in IE and Edge for the time being) Note2 : to Edit
func:function()
{

  G.resCategories={
    'animals':{
			name:'Animals',
			base:[],
			side:[],
		},
  }
  new G.Res({
		name:'seed',
		desc:'[seed] is not very tasty or healthy. Truely not',
		icon:[0,0,'cookieSheet'],
		turnToByContext:{'eat':{'health':0.02,'happiness':0.005},'decay':{'spoiled food':0.02},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'wheat',
		desc:'[wheat] is not very tasty or healthy. Hmm..I've already seen this somwhere..',
		icon:[0,0,'cookieSheet'],
		turnToByContext:{'eat':{'health':0.02,'happiness':0.01},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
  new G.Res({
		name:'egg',
		desc:'Well, it's eggs.', //Yeah, edit me that, maybe.
		icon:[1,0,'cookieSheet'],
		turnToByContext:{'eat':{'health':0.005,'happiness':1},'decay':{'egg':0.7,'spoiled food':0.3}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'chicken',
		desc:'Cached by [hunter]s, they ', //Yeah, edit me that
		icon:[1,0,'cookieSheet'],
		turnToByContext:{'decay':{'chichen':0.95,'meat':0.05}},//yes, a chicken can die...
		partOf:'animals',
		category:'animals',
	});
  G.unitCategories.push(
		{id:'farming',name:'Farming'},
	);
  new G.Unit({
		name:'farm',
		desc:'@[farm]s lets you produce specials goods like wheed.<>Yep... Oh wait I had written wheed, sorry, it's [wheat], of course, yes.',
		icon:[7,2],
		cost:{},
		use:{'worker':1},
		staff:{'knapped tools':1},
		upkeep:{'coin':0.1},
    modes:{
			'plant care':{name:'Farming',icon:[1,1],desc:'Produce wheat',use:{'stone tools':1}},
			'animal care':{name:'Breeding',icon:[1,1],desc:'Breed animals',use:{'stone tools':1,'chicken':3}},
		},
		effects:[
      
      {type:'mult',value:1.2,req:{'harvest rituals':'on'},mode:'plant care'},
      {type:'mult',value:1.4,req:{'farming':true},mode:'plant care'}
      {type:'convert',from:{'water':0.2,'seed':1},into:{'wheat':2},every:1,mode:'plant care'},
      {type:'convert',from:{'seed':10,},into:{'egg':1},every:5,mode:'animal care'},
      
		],
		req:{'farms':true},
		category:'farming',
	});
	//Then we augment the base data to incorporate our new resources :
		//adding seeds as something that can be gathered from grass yep, really cool
	G.getDict('grass').res['gather']['seed']=6;
		//adding a new mode to hunter for them being more friendly (I already said it)
	G.getDict('hunter').modes['cach']={name:'Cach Animals',desc:'The hunter don't kill, they try to be friendly.',req:{'caching':true}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('hunter').effects.push({type:'gather',context:'gather',what:{'chicken':0.1},amount:0.1,max:0.1,mode:'caching'});
	
	
	new G.Tech({
		name:'caching',
		desc:'@[hunter]s can now cach Animals and put them into farms//You'll of course need these farms from preventing your animals dying from corpses or running out.',
		icon:[0,1,'cookieSheet'],
		cost:{'insight':10},
		req:{'farms':true},
	});
        new G.Tech({
		name:'farms',
		desc:'@You can now build farms who let you produce plants//(And store Animals, yep.)',
		icon:[0,1,'cookieSheet'],
		cost:{'insight':20},
		req:{'building':true},
	});
	
	new G.Trait({
		name:'Farmers',
		desc:'@[farm]s are now truely more efficient',
		icon:[1,1,'cookieSheet'],
		chance:5,
		req:{'farms':true},
	});
			
}
});

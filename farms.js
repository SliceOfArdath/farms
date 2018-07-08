G.AddData({
name:'Farms',
author:'OscarHavril',
desc:'A simple mod that add farming. Needed for Futuristic Enginering',
engineVersion:1,
manifest:'https://rawgit.com/OscarHavril/farms/master/farmsManifest.js',
requires:['Default dataset*'],
sheets:{'farmsSheet':'https://raw.githubusercontent.com/OscarHavril/farms/master/pixil-frame-0(3).png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{

 	 G.resCategories={
    		'Fanimals':{
			name:'Animals',
			base:[],
			side:[],
		},
  }
  	new G.Res({
		name:'Fseed',
		desc:'[seed] is not very tasty or healthy. Truely not',
		icon:[0,0,'farmsSheet'],
		turnToByContext:{'eat':{'health':0.02,'happiness':0.005},'decay':{'spoiled food':0.1},
		category:'food',
	});
	new G.Res({
		name:'Fwheat',
		desc:'[wheat] is not very tasty or healthy. Hmm..I\'ve already seen this somwhere..',
		icon:[0,2,'farmsSheet'],
		turnToByContext:{'eat':{'health':0.02,'happiness':0.01},'decay':{'spoiled food':0.5}},
		category:'food',
	});
  	new G.Res({
		name:'Fegg',
		desc:'Well, it\'s eggs.', //Yeah, edit me that, maybe.
		icon:[0,3,'farmsSheet'],
		turnToByContext:{'eat':{'health':0.005,'happiness':1},'decay':{'egg':0.7,'spoiled food':0.3}},
		category:'food',
	});
	new G.Res({
		name:'Fchicken',
		desc:'Cached by [hunter]s, they will produce eggs if there are farms', 
		icon:[0,1,'farmsSheet'],
		turnToByContext:{'decay':{'chichen':0.95,'meat':0.05}},//yes, a chicken can die...
		category:'Fanimals',
	});
  	G.unitCategories.push(
		{id:'farming',name:'Farming'},
	);
 	 new G.Unit({
		name:'Ffarm',
		desc:'@[Ffarm]s lets you produce specials goods like wheed.<>Yep... Oh wait I had written wheed, sorry, it\'s [Fwheat], of course, yes.',
		icon:[1,0,'farmsSheet'],
		cost:{'basic building materials':300},
		use:{'worker':1},
		staff:{'knapped tools':1},
    		modes:{
			'plant care':{name:'Farming',icon:[0,0,'farmsSheet'],desc:'Produce wheat',use:{'stone tools':1}},
			'animal care':{name:'Breeding',icon:[0,1,'farmsSheet'],desc:'Breed animals',use:{'stone tools':1,'chicken':3}},
		},
		effects:[
      
     			{type:'mult',value:1.2,req:{'harvest rituals':'on'},mode:'plant care'},
      			{type:'mult',value:1.4,req:{'farming':true},mode:'plant care'}
      			{type:'convert',from:{'water':0.2,'seed':1},into:{'wheat':2},every:1,mode:'plant care'},
     			{type:'convert',from:{'seed':10,},into:{'egg':1},every:5,mode:'animal care'},
      
		],
		req:{'Ffarms':true},
		category:'farming',
	});
	//Then we augment the base data to incorporate our new resources :
		//adding seeds as something that can be gathered from grass yep, really cool
	G.getDict('grass').res['gather']['seed']=6;
		//adding a new mode to hunter for them being more friendly (I already said it)
	G.getDict('hunter').modes['cach']={name:'Cach Animals',desc:'The hunter don\'t kill, they try to be friendly.',req:{'caching':true}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('hunter').effects.push({type:'gather',context:'gather',what:{'chicken':0.1},amount:0.1,max:0.1,mode:'caching'});
	
	
	new G.Tech({
		name:'Fcaching',
		desc:'@[hunter]s can now cach Animals and put them into farms//You\'ll of course need these farms from preventing your animals dying from corpses or running out.',
		icon:[0,1,'farmsSheet'],
		cost:{'insight':10},
		req:{'Ffarms':true},
	});
        new G.Tech({
		name:'Ffarms',
		desc:'@You can now build farms who let you produce plants//(And store Animals, yep.)',
		icon:[1,0,'farmsSheet'],
		cost:{'insight':20},
		req:{'building':true},
	});
	
	new G.Trait({
		name:'Farmers',
		desc:'@[Ffarm]s are now truely more efficient',
		icon:[1,1,'farmsSheet'],
		chance:5,
		req:{'Ffarms':true},
	});
			
}
});

module.exports = function infotracker(dispatch){
	let cid;
	let player;
	let boss = undefined;
	
	var coorBool = false;
	var bossBool = false;
	
	dispatch.hook('S_LOGIN', 1, event => {
		cid = event.cid;
	})
	
	dispatch.hook('S_SPAWN_ME', 1, event => {
		dispatch.toClient('sWhisper', 1, {
			player: cid,
			unk1: 0,
			gm: 0,
			unk2: 0,
			author: "fgtdylan",
			recipient: player,
			message: "Spawn xyz: X: " + event.x + " Y: " + event.y + " Z: " + event.z + " W: " + event.w,
		});
    });
	
	dispatch.hook('cChat', 1 , (event) => {
		if(event.message.includes('!xyz')){
			dispatch.hookOnce('C_PLAYER_LOCATION', 1, event => {
				dispatch.toClient('sWhisper', 1, {
					player: cid,
					unk1: 0,
					gm: 0,
					unk2: 0,
					author: "fgtdylan",
					recipient: player,
					message: "current: X: " + event.x2 + " Y: " + event.y2 + " Z: " + event.z2,
				});
			});
			//spitCoordinates();
			return false;
		}
		else if(event.message.includes('!bossid')){
			dispatch.hookOnce('S_BOSS_GAGE_INFO', 2, (event) => {
				boss = event;
					dispatch.toClient('sWhisper', 1, {
						player: cid,
						unk1: 0,
						gm: 0,
						unk2: 0,
						author: "fgtdylan",
						recipient: player,
						message: "huntingZoneId: " + boss.huntingZoneId + " templateId: " + boss.templateId,
				});
			})
			//spitBossId();
			return false;
		}
	});
	/*
	function spitCoordinates(){
		if (coorBool == true){
			dispatch.hook('C_PLAYER_LOCATION', 1, event => {
				dispatch.toClient('sWhisper', 1, {
					player: cid,
					unk1: 0,
					gm: 0,
					unk2: 0,
					author: "fgtdylan",
					recipient: player,
					message: "current: X: " + event.x2 + " Y: " + event.y2 + " Z: " + event.z2,
				});
			});
		}
	}
	
	function spitBossId(){
		if (bossBool == true){
			dispatch.hook('S_BOSS_GAGE_INFO', 2, (event) => {
				boss = event;
					dispatch.toClient('sWhisper', 1, {
						player: cid,
						unk1: 0,
						gm: 0,
						unk2: 0,
						author: "fgtdylan",
						recipient: player,
						message: "huntingZoneId: " + boss.huntingZoneId + " templateId: " + boss.templateId,
				});
			})
		}
	}*/
	
	
}
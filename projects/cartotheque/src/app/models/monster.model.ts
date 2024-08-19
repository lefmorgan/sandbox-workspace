import { IMonster } from "../interfaces/monster.interface";
import { MonsterType } from "../utils/monster.utils";

export class Monster implements IMonster{

    id: number = -1;
    name: string = "Monster";
    type: MonsterType = MonsterType.ELECTRIC;
    image: string = "assets/img/pokemon/pikachu.jpg";
    hp: number = 10;
    figureCaption: string = "N°001 Monster"

    attackName: string = "Standard Attack"
    attackStrength: number = 10;
    attackDescription: string = "A standard attack";

    copy(): Monster {
        return Object.assign(new Monster(), this);
    }

    static fromJson(monsterData: IMonster) {
		return Object.assign(new Monster(), monsterData);
	}

	toJson(): IMonster {
		const jsonObject: IMonster = Object.assign({}, this);
		delete jsonObject.id;
		return jsonObject;
	}
}
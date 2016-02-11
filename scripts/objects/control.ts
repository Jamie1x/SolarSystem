module objects {
	export class Control {
		rotationSpeedx: number;
        rotationSpeedy: number;
        rotationSpeedz: number;
		opacity: number;
		shirtColor: number; // hexadecimal value of the color
        pantsColor: number;
		constructor(rotationSpeedx: number, rotationSpeedy: number,rotationSpeedz: number, shirtColor:number, pantsColor:number) {
			this.rotationSpeedx = rotationSpeedx;
            this.rotationSpeedy = rotationSpeedy;
            this.rotationSpeedz = rotationSpeedz;
			this.shirtColor = shirtColor;
            this.pantsColor = pantsColor
		}
	}
}
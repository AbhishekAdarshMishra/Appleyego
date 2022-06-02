export class CurrentSliderService{
    
    currentSlider:{_id:string;caption:string;link: string;image:string}={_id:'',caption:'',link:'',image:''};

    setCategParams(slider:{_id:string;caption:string; link: string,image:string}){
        this.currentSlider._id = slider._id;
        this.currentSlider.link = slider.link;
        this.currentSlider.image = slider.image;
        
    }
    getCategParams():{_id:string;caption:string;link: string;image:string}{
        return this.currentSlider;
    }
}
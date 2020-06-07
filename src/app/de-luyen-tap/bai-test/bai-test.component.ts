import { Component, OnInit, ViewChild, OnDestroy, ElementRef, AfterViewInit } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { trigger, style, animate, transition } from "@angular/animations";
import { Title } from "@angular/platform-browser";
import { forwardRef, Input, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  faTrashAlt,
  faSquare,
  faCheckSquare,
  faEnvelopeOpen,
  faArrowAltCircleRight,
  faCheckCircle,
  faLightbulb,
  faWindowMaximize
} from "@fortawesome/free-regular-svg-icons";
import { Params, ActivatedRoute, Router } from '@angular/router';

export const fadeInOut = (name = "fadeInOut", duration = 0.1) =>
  trigger(name, [
    transition(":enter", [
      style({ opacity: 0 }),
      animate(`${duration}s ease-in-out`)
    ]),
    transition(":leave", [
      animate(`${duration}s ease-in-out`, style({ opacity: 0 }))
    ])
  ]);
@Component({
  selector: "app-bai-test",
  templateUrl: "./bai-test.component.html",
  styleUrls: ["./bai-test.component.scss"],
  animations: [
    fadeInOut("fadeInOut-1", 0.3),
    fadeInOut("fadeInOut-2", 0.7),
    fadeInOut("fadeInOut-3", 1)
  ]
})
export class BaiTestComponent implements OnInit, OnDestroy {

  

  constructor(
    private router: Router,
    private titleService: Title,
    private modalService: BsModalService
  ) {}
  modalRef: BsModalRef;
  mp3: any;
  show: boolean;
  image: any;
  goiY: any;
  selectedItem: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkOpenModalOrNextCauHoi: boolean = false;
  checkKiemTraCauHoi: any;
  checkCauTiepTheo: any;
  indexCauHoi: number = 0;
  checkPlayMp3: number = 0;
  giaiThich: any;
  cauDung: any;
  checkGiaiThich: boolean = false;
  showCorrect: any;
  showInCorrect: any;
  isLoading = false;
  faEnvelopeOpen = faEnvelopeOpen;
  faArrowAltCircleRight = faArrowAltCircleRight;
  faCheckCircle = faCheckCircle;
  faLightbulb = faLightbulb;
  faWindowMaximize = faWindowMaximize;
  totalCorrect: number = 0;
  checkGoiY: boolean = false;
  checkUserChooseAnswer: boolean = true;

  intervalId: number = 0;
  seconds: number = 0;
  minute: number = 0;
  hours: number = 0;

  clearTimer(): void {
    clearInterval(this.intervalId);
  }

  private countDown(): void {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds += 1;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minute += 1; 
        if(this.minute == 60) {
          this.hours += 1;
          this.minute = 0;
        }
      } else {
        if (this.seconds < 0) {
          this.seconds = 0;
        } // reset
      }
    }, 1000);
  }

  openModal(template: TemplateRef<any>) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    this.checkOpenModalNextCauHoi = true;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: "static"
    });
  }
  
  load(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 2000);
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  start() {
    this.isLoading = true;
    this.wait(500).then(() => (this.isLoading = false));
  }

  baiTests = {
    listen: {
      listening: [
        {
          transcript: "",
          linkImage:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQDxUPEA8VFRAVFRUWFRYVFRUWFRUWFxUWGBUVFRUYHSggGBolHRgVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0mHx8tLy0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLf/AABEIALEBHAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQYEBQcDAgj/xABNEAACAQMCAwQHAwYKCAYDAAABAgMABBEFIQYSMQcTQVEUIjJhcYGRI0KhNVJzdLGzCDM0YnKCkrLB0RVDorTS4fDxFiQ2k6PCJUSD/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECBAMFBv/EADcRAAIBAwMCBAUBCAAHAAAAAAABAgMEERIhMUFRBRNhcRQiMoGhsSNCkcHR4fDxBhUzNENy0v/aAAwDAQACEQMRAD8A9e0Pil5iQrssQOFUNygnzIHtH41mU3Nmx01BYKXbanMEWUTtzFiuQxBU+GSDnceNX6lXxkt/CnapcxOsV4BJDnBbpKnv5s+t8x86ObiR5SnwdqtbhZUWSNgyMAVI3BB6EV1Tysmdpp4Z7VJAoCKAUBhatdiKJmz4VenHVJHa3hrqKJz6fVVmJR877DoMjyyehB3GdtyPGt6jjg9W6sq1vKNzQWXHld0Rw/orTTAFCYx1b7ox4MOvN7j+yqVamlGmfi9KpQcqbw+3U6bFGFUKBgAYFYG87nzjeXk+qECgJoCKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoD8varkkyPv4gfHw/wA/+1ZFtsj0ZLO7PvhXTHuJ+RslHHrY8B1GPhtSU8cEQpauTca/we0I5jl1/OXHMPfy+PyqnmNnbyccFk7LeKPRSLOeQG3c/ZP4Kx+6c9AT4efzq9Kph4OFejqWVydirWYBQCgPC9uRGnOfMD69KmMdTwFyl3Oe6nrneOyk+o3n5+WfAe/wwD7q9CFNJHvVfDqsacatH64fk06aazyBF35iB0GQD+cM/HcbHG1WlLCNdr4zSqwev5ZR5T/kdY021EMSxr0UAZ8Tt1NedKWp5Pmaktc3LHJl1UoMUBBoCKAUAoBQCgFAKAUAoBQCgJoCKAmgIoBQCgFAKAUAoBQH5gDiTLN7I+uPD5msWcI9Tll77O7XCtLjc+6qdTtpxEsmqSRqAJGOW2CqOZj8FFQ45LRlpKFxBovdBruBS0RPropHMhyBzAHYgnGR8Dnarwx1KTTfB0ns74ke5Q21xHyTRxxum+eeJh6rfHIwa005dDza1PDyi6V1OAoCm8ZavykRKdgMkefrDp9DvWu3h1PVsbCNzSlnrt7Mp95Bz/aR7g7kD8SPd5jw+GCdJ6Ph/iDpy+Fudprh90bvg3SnnkDsxEMZzjzb80HrjpkVmrTwsHPxWVCG6inN9fQ6RWQ+dJoBQEGgIoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUBNARQE0BFAflGzlLyLFnqfxPnWJrG560Xl4Ok8M6gQwgiOQDg4jfw65kOx+AGaph4ydc5eDfarYrLglmUEYJVipHmMjfFRnDyW0ZWD2tbWCOMQx4CkEeB3I6kdDvvVsrIknp9jJ4MgDTLIB60cKQsfMrz5HyOKvReZexhuNoY7l4rYYCucR60FR0jProVJ965Ga0UqWWmz0rO1zODnxLKXuUa5uvScnH2g6e/Ix/kPkD4mtiWD0PLl4bcKf/jm9/R9zDsJGDH83qc5AXHVsjcEeY+FRJ7Ho+I2lC5ppz56NcnWtDg5LdBy4JGSPHJ3399edN5kfH1ElJpPOO5sKqUFAKAg0BFAKAUAoBQCgFAKAmgIoAaA8I76JlZ1lQoueZg6lVx15iDgfOgPcGgJoBQEUAoBQCgFAKAUB+OYbwQyxyNkhTkgbk+7euGnUmjc6nltM7/p2qQtbLLEM8ygggeB8c1lyo7HoL5/mT2MpJDLETERg7Fm9XlIODs2/4VZReCutJmBawlDKztkcyhDjGFCqD+PMc/CqtYOjyWnhCxNvbmWaRC8rFzg+oqn2VBPU46nzrXSgorKPHrylOWMcGp4n4pZZu5hb1CrAkfnYG2fn+FehSpZSbPWsPD4yipVFu+Cry3xDhidioVvHoAOnj0U499a1E31rN1aMqcdpReYv8oxp0MbggbE5HiCPEZ8Rv9CPOnQvaVY31q6dX6uJLsy28JaYLh+/ZTyKd8gHnYbhST7QBwc4B2GSay1qmNj526pV7XFHzcxXC649S+OwUEnoASflWNvCyYksvByTRF1TUe8mt7xlQSEYeaRMZ9YBQqnYAisNPzprKZ9jdLw6y006tPLx0WfTujaJwzrWRm/GMjP/AJiXp/YrpGnWzu/z/YxyvvCcPFJ/wX/0dKrWfMkUAoBQCgFAU+x47W51STTbW1eUQnE1wGUQx49rPiSDlcdSQfAE0BcKAUAoBQCgNJxokLafcLcztDAYmEkiHDKv83zJ6Y8c48aA4FoWl6TdTw249PskuF5VkkePu7kq3Lj2cAswI2yoOBigP0fptilvDHbxDEUSKiAkkhVAAyTuelAZNAKAUAoBQFS4440/0T3cktnJJbOQpmjZcRtno6ncbbjz6UBaLW4SWNZY2DRuoZWByGVhkEHyIoD1oBigPxdqELE82Omx91cqb6GuvBvdG24X4quLD2DzQ5yY26e8qfumoqU1MmjUlT9juWha1Dcwicrsyg8w3B9xxuKyKel4kegnJrMWeep3wlxHGPVHXbGa51Jp8HSnFrdmvuLmRVRM5G5A64+A869Lw2OpSyb7WjB6psw4OQxMz83OxbKnIIZSwXG2wOQ2c/KvXiZ9d1VuYeUl5cHznOUeIGcqBucEfLOfrkVY2XlZ29SnV/dzpf34f2Zn6HD6Qy2x6s2x8h4n4gZ+IyPKuc5YWTB4lSqW1ZXlDrtJfzOs2VqsUaxoMKowBXnNtvJ89UqSqSc5cs13GN13On3Dg4PdMoPkzjkU/UiuNeWKbNXh1LzbqnH1X43OecIa1eRWncWFiZW52aSRgSnMcAAAEA4UL975VmpTmoJQR9J4laW1S48y5q6dkklz/P8AQ3ukcfSLOLbUbfuXJA5wGUAnYFkbJCn84Ej9tdYV8y0zWDz7jwWDpOraz1JdP86+hfhWk+eKJ2xcSXOm2Mc9o4SRp1QkqrjlKSEjDe8CgOeNx/xDawRX9zEj2cvKULRxBXDDmXeJuZCQDjP/ACoDd9onaRdQxafcWEgjju4mkZWRHIOYxy5I2Iyw2oCx9sPE91p1jDPaSBJHnVGJRXBUxSNjDDzUUBVOLu0HULeDS3imUNdW6STZjjPMxMeSAR6vtHpQG47Wtbl0WCBtMWKAzSSd5ywx4YqgIJGOvvoDF451viC3kluLVQNPSKOTvCtscDuUMpwx5/a5tsfCgNPwfxVxJqBSaLlktRMqSsEtlwAVMgwxDeyfAUB2rV5mjtppEOGSKRlPXBVCQcH3igOL9mHaZf3mqQ2t3MrRSrIABEinnWMupyoz90j50Bsu2DtAvdPvo7azlVF7kO+Y0fLM7ge0Ntl/GgPfi7jYxcPWdxPDDcXV0qECaNWiDBSzSmPoSNgB5tQFJv8AW9Ys4ba51Gzglsmx3MU1va8gUrzBEEa80JKjbPluDjFAXTtT4/ubW3sLnT5Akd1E8h5o0c45YmQesNiOc0B1i2YsisepUE/EgUBwvijtQv7PWZbfvl9DiuFVk7pC3dZUuObGc4J360Ba+0DjC7tNYsLS3lUW9wYe8BRW5g84Q4YjI9XyoDXdonHt+NTGkaSAJhyhm5UZ2dk5+Ve89RVC4JJ9/TFAfPA/HOpRaqNI1hQZH2VuWMMrcpdN4vUdGAIyBnOPfQGf25cVTWUdvBByEzmTvFkiSVWVOTAKOCPaYfSgMrsR4klvrKVZu7DQyhVEUaRKsbIpUBEAA9bnoDA7PeNL6XWbnS9QlVzGJRGRGiHmicDPqgZ5kPN8qA0Haf2n39pqclrZSqsUQRWzHG2XKhmOWBP3gPlQFO1GCPmJXYsuWXz8yPgev186yNOMsdj2K0FGTiV2YEqFXfLYwB7WehrqtzM0+DpPA1ybSIIwzGd+hyM9ce6r1bCVRaoPc9+n4f8As1oZdDqUJXPeKAfLOfpjNY/ga7enSc/haqeNJqbubvJvsgSBjl23ON84r2rS38inh8s2QhGlRfm9eSbawOGaViucY2UeGOhxitLeODzpXdK3apWUNXV4/mz7Pcx+zlm6ZydvgSMD5A/GmWzjUt/EL5aazUIPot2b7gC2VriSXG4XYeXMd8fL9tZa8tsF/F3KFCFPOf7F/rKfOmLqLwiM+kGMRnAPecvIfHfm28PwqssY3OlJVHL9nnPpz+D609YhEvcBBDjKd3jkwd8ry7YPuqVjoKrm5vzM6uueSm9rlqhs0kIHeLKFU+PKytzL8NgflWW6Swme5/w7UkrhwXDW/wBi0cMSs9jbs/tmGMt8eQVqjwjyL2MY3FRR41P9Tn/8Ij8lxfrSfu5akzFd401WA8J2VuJ4zMVtfsw6l/VTLZUHIx76AqnGyldM0XmGP/LzN8jKjA/QigLJ2x8b2Oo2MMFpOZJEnV2BjlTCiKRScuoB3YUBpu0D+S6H+px/tioC3/wkf5NZ/pJf7goC8ccfkC5/U2/digK5/B5/JMn61J/cioDoOv8A8juP0Ev7tqA/LfBDm2vNPvB7Ju+6b3Y7oN/szGgN12t5uNWv5s+rbi3iHxIQY+veUBl9pP5A0X9E/wC7joC3duX5Dsv00H+7S0BTu1D8j6J+qv8Au4KA/Rdn/FJ/QX9goD8zcbaWbnWNVx7UKSTj3iMw8/8AsF6Azb/VfS7rQJicsFt43J680V33ZJ+PLn50BvIf/XR/SN/uVAWS4XSLzXobxdTPpsbrGsAQ8rPHzDlJK+8+NAartFX0vinTrM7pGImYf/0eRv8AZjWgMXsCb0fUb+xJ3AH/AMErxn++KA+e0XGl8TWupYxDLyNIfh9jPt/QKmgKZp3C93rT3GoRLs9xLzZO4ZsSY+QdR8qA196/eyseblJOF8xuST+wVlT6np1Myk2e2k6O0k3Iu5xz7/zdx/hXaim6iJgqeUqqeHsy82kUygRvF6pJI9UbFtyB/hjzr2Y4Pcs7ezo6p0Z/nj09jLOlSrj1c/DGB5gkdKvqTO8fF7SaclPZGXGvcDlGDIfaOMgDwAz1+NUbyZGoeIfNNfs1wn19fbsejwyvgtt5cxCj+qP8hVXgo7yxs/lTS9Fueq6aBvI2Pw/FsE/IGquRnl4zOptb02/V8Fo4J5A7hPzQfHzx1PX6Cs1bg829V00p3DW/CXQt9ZzAanijRhe2j2+cMcFCegdTlSfd4H3E1zq09ccGywu3a141V059nyUXR+I73S09EubJ3RMhCMjAz0DhSrr1x4is0as4LTKJ9Bc2Nrfy86jVSb5T/pymJYL3XJ072FoLNDk5yNvEgsAXcjYEDAz9Z0zrSTksJCM7XwqlLy5a6j/z7L8s6fFGFUKowoAAHkAMAVsPlG23l9Tl/wDCI/JcX60n7uWhBq+Cex+wuLS2vZ5J3MsUcjx8yrGSygkZVQ2P62aA138IWBUm0+NFCoscqqoGAFDRAADwGKA+u2jg+xsLCCa0tVikedUZgznKmKRiPWY+IH0oDQdoH8l0L9Tj/bFQFv8A4SP8ms/0kv8AcWgLxxx+QLn9Tb92KArn8Hn8kyfrUn9yKgOg6/8AyO4/QS/3GoD8wwWx/wDDouF9qHU+vlz20eD/AGkWgMy6kNzpuqaic5n1CDGfAZlfH0kUfKgNn2k/kDRf0T/u46At3bl+Q7L9NB/u0tAU7tQ/I+ifqr/u4KA/Rdn/ABSf0F/YKA4vw3bLLxdqMTjKPFcIw8wwhB/A0BzbQ4JIdXtbWQ5Nvfxx48ARcqGx8SM0B0GH/wBdH9I3+5UB5alpENpxhbRW6cqM8crAszZeQSFzliep8OlAYetcVw2nFk99cK8kcBaJVj5SwYQiP7xA2Jfx8aAjs312KXilriFWWK7a4wrY5gXXvSDykj2lPjQF0/hDWKvpsVwfbinCg/zZFYMPqqH+rQFg7HbFYdEtuXrIrSsfNncn8BgfKgPzrc2rLc7jZnHzB3H1rJGScT0pRakXnhbSmaUSKPVC4zkAEbrnf4NWyzj87kz0aF1b08yqSS7Fmh06TOAV+Tr/APU5r1NSOtTxixaw5J/YlrCXmDSOFA8S2D8s0yuhaF/aunpowcvTSehu4Yt19d/P/Inf6DPvquGcHaXt1tUeiPZcmBcanITseUHry+r9T1J+Jq2EejbeEWtHiOX3e562IZgXwdh1PTJ/nHauMhdXNCgsSkkXHgy2KTEkjBiHTJHtA+1jH41wrcHz1/4hSuEowzs85LlWc8wUB9UAoBQFH7XOF7jU7KO3teTvFnWQ87co5Qkg2ODvlhQG/wCEdPe10+2tpcd5FDHG3KcjmVQDg+IoCk9r3A93qk1s9r3eIVkDd4/L7TIRjY59k0Bsu1rhS41OyhgteTvEmEjc7co5RG67HB3ywoDTcWdmU15pNjCjot7ZwrHuT3bjlUOvOBkHKgg4+mcgDQL2ca1qM0K6tcr6NCcbyKz8m3MEEY3ZsAczHPjv0IHVuNbLvtMuLZGRWkhaNOdgiAkYALHoKA0fY/w/Lp9g8E7RM5neQGJ+8XlZEA3x1ypoC3anEZbeWNMFmjkQb7cxUjBPhvQHKdK7NbyPh+602Qxeky3CSxYclPV7kbtjYkI46eIoD5TsyvF4fbTh3XpT3Ynb1zycoAUetjrgDwoDca92cyXmh2lizol5aovKckxlgpVkJAzynbfHUCgKhJ2ca9eiG0vbpBaQkBC0ivygDlyqqvM7BdhzH5igLN2n9ndxewWNtYCPu7WN4/tHKnl5YlTwOThDmgOoW6FUVT1CgH5CgOfcP8GXUHEVzqb936NKsgTD5f1u7xlcbeyfGgNLxF2ZXUmvLqNv3XoxuLedwz4cFGQyYXG+eUnr40BkdofZ1eS6iNV0uZUuPVLKW5GDqvKHRiCpyuAQcdPHNAfHA3Z7f/6TGq6vOrzIMooYOzNylAWwAqqoOwHj5eIGfwBwHPbaje3t9HC3pDMYwCJMc8rSNkEbH2aA8uIOArptft9Ts1hW3QwmQc3I3qkrJhQuD6hoDf8Aarw3PqWn+jW3J3nfRv67cowobO+D5igNrwRpclnptvazY72KMK3KcrnJ6HxoDl+odmN68iurW4AYNgyP4DoPU8/21ljSaR6DuYNm+0jg69gZsSQhSqgYY52Ln8z+dW+hOMFuafPsJbyhl+39zMm4dvm/1yf+4/8Aw1p+Jpnene+Hw4p/hf1MCTgu8P34v/cf/gp8VA2x8atI8J/wX9T7i4Fn6vJGT5BmA/tFf8Kj4mBkuPH3xRh92ZQ4PlUer3OfezE/2mUj6KKj4mB48766uH+1qOMe0V/o+n4au/B4QfPnct8mZSR8sVR3EMne3Xh1J5kpSfr/ALN9oemyQy88jqfswpwSTkY8x7q5TqKXBFzc0pw001jfJYBMpOM1yyeeelSBQFY4i4v9EuktVtJZ5Hj7wCMjOMsDt125Sa5ynpeEjfbWPnU3Uc1FJ43PK047hmNoI4nPpTvHvgGJo+XmDjx9odKKonj1Jn4bUh5mpr5En7p9jP0/iRJbi7t+7ZTaY5mJGGBDHIHh7JqVPLa7HGpaShTp1M/XwaTs711L6a6l5pu85kblkfKIjAhVjjBwuOXc9Tmq05KWWa/ErWVvGEXjHp39TO4p4xNhJytZTPH6oEq4CFmzhAT47VM6mnocrSw+IW00n26n1qHGHo9iL2e0ljJk7sQtgPk5wfhgE0dTEctEUrB1a/kwkntnPQ+L3jeOPTYtS7lmSVgvIGXmU5cHJ6bFDR1MR1YJp+HTncu3zuupmWPFEc1zDbpG329sLlXyMBT90jzqVNN4OVSznCnKbf0y0mdrGhWt4vLdW0UwAOO8RWK568rHdfkRVzIfmTjhrbTdUP8AoW7dVQKWKOSqSAnKK/8ArFAx1z1IyaA7H2U8ZNq0skhTu3jgiW4AP2ckxdwsqDw9RMfPByFU0BbtF1JbyeaRCWghcRRt/q2cD7ZkP38E8nN02YDxyBumYAZJwBuT4AeZoDGN/EygpKrcysV5GViwX2ig+9ioyi/lyT3RVOBLtuWWW4uZeVSijv54pEHNvnnQAB8nBU9OgyMVSHqb76CzGMIr7Jot13exQgNLKkak4BdgoJ8gT410bwefGEpfSsnlf6tBAMzTonqlgGYAlQMkqvU/KobSLQo1J/Smw+rQKqs88ah1DJzuq8ykZBAbG1MoKlNtpJ7GNqmuxxQPLGySsoUhFkQZL7JlicKp8/IHrUOSwXpUJTmovbPoYWhaw9w4klkiiRlKJAHR3aVWPeMHHtLjlwF8Dk46VEXk6V6Maa0xy2uvp02/U28mpwKqu08YRjhWLqFYjYgHOCatlGdUpt4SexkTTKil3dVUdWYgAfEmpKpNvCW55+mxep9qn2n8X6y+v/Q/O6jpUZJ0S3245IS/ibZZkOQxGHU5CnDHr0B2J8KZQcJLoesMyuodGDKdwykEEeYI61JDTTwzALVzIGaAZoCM0JwKDAzQYIzQYGaEH1CfXHxFESbKuhAoDnPFl7JBr1vJFbtO4tWAjQ4Y5aUZz7q4zeJr2Pcs6caljOMpaVqW7K7/AKNurM6aDCDdNcXMqxMwAy3dAKzdBsM/OqYa098mxVaNbzt/lUYrPsZVlfSp/puWdBHOYkDKrcwV3DoAG8eoplpSfUpOnCXwsYPMcv8AU2HAca22qLArAiXT4GOCD66BQRt47MamntLHocPEJOrba30m19mbjta/kUX61D+x6vV4M3hH/Wl/6sntA5ZLnT7VyAr3BkbJwOWNN8/2jSpzFeo8OzCFaouUsfxZTIyG0OO2bcRakIj7wSzH+8a5fuY9T03mN86i6wz+D74Z1WOy1ELdyiNLOG5hZ3OByiclMeZIYAAbnaph9eO2Tl4gk7R1VxNxf3xuVbj/ALUbnVH9B09XS3duQBc9/cZ2wcbqp/NHXx8q0nzhvNA7K7Kys+/1ti08uyQxs3MpwSI41j9aaXzAyBjxAzQHO9CtZLXVls5ee3R5VjmWaVoD3DkNiVkZRnkIOOmT0oDsfAtpe3FtItrfxRWUVzLHFA8PfuiRyZELyq6ZQjHmcNjJoC/ztMbWUzqit3bjCMzg+ofWyyrjPljbzNQy9L64+5xzSbhlthFkhorO+ZT/ADZoIZVI/tN9Kyx2j7Jn1deClUc+kpQ/DaNhqdnHBHLHEgRGs9NdgOhc3C5Y+/r9alpLKXZfqcKVSVSUZTeWpTX2wWvtEto/SLWW6TNniaF2IysTyqBHKw8gR18MV0qJZWeDz/Dpz0VI0niezXqlyircSaQix36Oe9e1tbBIpD1A6ErvtkVzcVlrskeha15ZpOOynKbaLd2iaXC1rA7RKWWa2iUkdI2kUMg9xFdKqWEeb4dWqRqzSfKk/vgrXFlvFDLfRhAsCHTBygbBAzZAHljNUmkm17fqbbOU5xpvPzPXv64PriGW2WTT7rT0CW8bTzYClMhJYFlPKdxsD9Kl4WME2yqONanXeZPC798GFbQQSLEt0VEK2V6wZgWCO12yrIAu+RkdKrhNrPZ/qXlKpDLp/U5QXv8ALwW/iNOfRbe3Eved8bKESAEc4Z48sAdxkAneus/pwedaS03kptY06njsVC5uWFvpEwODbidm/owSwhx/ZBqnSPoelBLXcRf7+MfdNo+tP1aG1MEsz8qNb6gikAtlmun5RgDxqMpNP0ZE7epVU4wW6cPxE6LwAP8A8Va/ol/xrrS+hHi+If8Ac1PczKGMc1CcEZoTgjNCSM0AoBQChB623tj/AK8KlB8Gyq5UUBXbrQZH1aG/Dr3ccLRld+ck8+42xj1h41Rx+bJshcxVrKjjdvI4g0GS4vLO5R1CWzuzhs5YNy45cDHgetJRy0+wt7mNKlUptfWjRarwPPM18VmjC3ckDDPPlVjYswbA6nbpVHTbz6myj4lCmqWzzTT/ACZ0HBCW+oW93ZqkUUausqZcl+ZSARnPn7ulT5eJJo4y8RlVt50quW3jD7Gw420KS+t0hjdVZZkkJfOMLzZGwO+9WnHUjjY3Mbeo5SXKa/iY/EHCgvr6GacI1rFE6mMlgxdj128Onj4VEoammy9vfOhRlCGVJtb+hz7jaGHR4JY2mj+0u4ri3t1LGTkTmBDZHqjdRzE+B6naq+W90u5q/wCZxlKM5p5UXF/fqc31PVZ9bumWO3zdXEgKpGPVAAAG5O2FG7HbqdqsofPqM8r5Ss1btbp8ndezLs2h0qMTS8st8w9aTGVjB6pFnoPAt1PuG1dDzi6Lp8Ycycv2jDBf74X81W6qvuGBQFN1HgWGfT7sGFWu7gzSJK455VPNm3XvHy2AqRAjPnQH3w3o/cwwajYqqmaGN7m3RRFFMGUMWjTpFMvMceDAcrHfmAFtvW7y3fkBPNG+Bgg5KnAwdwfDFQ+C9N4mm+5zMcJ3BMRWFgX0poXyMBZhEVCsfAn1R8qz+W/we98dSUZJvion9j5m0u8uYZpDZSxkQWMCo2OZ2hmVpGUfmgDrU6W8vHYRrUKUoxU095PPuti0ceLc5UR28lxbSQzRSRJjaRgvdSEHwBzv4VeeeiyjBYOlu5S0yTTT9OqKrfaFexxvaejNI13bWUXeAgrG8GO8Dn3DxrnpktscpHoU7mhJqpqxolJ4754wXjjaykltYkiQuy3FuxCjJCrICzfACutRNrb0PKsqkY1ZOTxs/wAorfFWl3DXN5LHbO4Z9PZOUe33TMXC/DaqTi8vHobLStTUKcZSS+vPplbGXqEE2ozQs9nLCncX0TB8HlMkcYQkjpk5x/RqWnLG3cpTlC2jJKabzFrHo2V210m8t7aBvQZJGa0urZkAHNG8kxZGcH7uDnNUxJJPHQ2zr0KtSfzpfNGWe6S3LRq+h3DWunWcbFHieIySqocRGKBgGIOx9YgCukovCSMFG5pRq1qkllNPC75ZpNM4buSyW80TlFOpxmQqArLMqd3JgdAx5iPhVYwfHuaq13S3nB7vQ8e3K+xPCmh3MYt+8t3Xls7xGyOjvMWRT7yNxSEXt7C7uqU3NxlzKL+2C68F27xadbxSIVkWMBlOxB32NdKaxFJnlXs4zuJyi9mz0NQZ0iM0JwM0JPkmgGaDIzQZGaEZGaEZPay3kHz/AGVK5BtKuQKAUAoBQCgJoCDQH5i4o7OtTfWHtsPcPM3Oty+eRo/z5H6KV2BX3DA3GQO5cAcC2+kQcsY57hh9rMRhnP5qj7qDy+uaAtdAKAUBiaZa9zGY/uh3K+5WcuAPcObl/q0Bl0AoBQCgMS506OSWKZ1zJCXMZyRyl15W2GxyPOowXjUlGLiuHyZdSUFAKAUAoBQCgFAaQtXMlEF6Fj556AjnoQ2Rz0IyOegyO8oQQZaAyNMfMuPcalA3NXAoBQE0BFAKAUBNARQE0BFATQCgIoCaAigFATQCgFARQCgFATQEUBNAKArBnHnXMlHy0486FjzNwPOhXJ8+kjzoQfJuh50B8G9HnU4B8Nfr51OlkZMebVlH3hVlAhyMK04yit5WkfJAjIVR95iVwMnYbZ+ldo0XLgo6qjya6XtFvpm+ziSJPDClz82P+Vd428VycJXD6GRbcaXSNlpA380qMf51MqMCsa8i/wDDutpeRc6jDrsy9cH3HxFZJw0s1wkpI2tULigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoCaAigFAKAUAoD8sw9oF/BlZgkoz7XrKw9wKkAfNTXVwcXuikZqS2Z9y9o8zdMr7s9PrnNTmn2I0y7mA/Hl0f9c4+HIf/AK1HydicS7mK/Gt6ely/0T/hqr0llkm44zu+i3D9evqdP7NVRLPOPi+8PW4bHwX/ACq6w+hVoyE4puScd47nyG3+G1dNPoVeOpuLOe4k3mcAdeVDltx94kn6DFdoUesv4GapWS2ibOCPAwd8771oSS4MspNvLM6IY8MUZUh5KodEWns0vT6ZyDoykH5AnP4VmrLY10XudWrKahQCgFAKAUAoBQCgFAKAmgIoBQCgFAKAUAoBQCgFAKAUB+RblQT7q9NrJ5yZrLizU7gYPu/yrhOinwd4VWuTXSRletZpQceTQpJ8BRvU4RJ7JDk4AJPu8a6xpplHLBtLXSjkc+3uHtfPwH413jTOE63Y21tGIwQgxnrv+0+NdUkjhKTfJsbBt/fUlJGzjYUOYa4x0qGWSMe5vgNs1Rs6xiXLseSSS8lfl+yijIJx1dyOUZ/o8x+dZq72wa6K6nYazHcigFAKAUBNAKAUAoBQCgFAKAUAoBQCgIoBQE0AoBQCgIoD8iSEHfNeoeaeLioZKPE2+QTjaquOS+vDIg01dmOPhnb51RUI5yXdd8GxSMJuqqM7bDFdlFLg4ubfJ9957sVOSB3u+9QD2hu+U7UyHEyDqf8A2pqK6DxOoFjyjqdgB/11qrkdFAuHB/Z5c34SabMFrnOW/jZF2PqIegP5x+QNcJ1VH3NEaXc7jpWmRWsSwQIEjXoB4nxJPiT51lbbeWd0sGXUEigFAKAmgIoCaAigFAKAUAxQCgFAKAUAxQCgFAKAYoBQCgFAfli17P8AVn//AEyo83kjH4c2a7/FxRX4Vszrjgq5s4s3SLzycwQq3MEIXYHbqcn6DyrpRreZl9jhXpOngrVt6iZB9x/x/HNaIrCM823I+zMq+FWyVw2QboZz/wAqhslJnxJdDwqGy2k8mnqrZKiRAzOwVVJJ6AA71GS2k6Dwz2aXVyveT5gjOMAgd4wJ3IX7u2+/0rnKqlsjpGlnkvfDvZtaWrhyGmkU9ZCp3ztsoA+RrP5kmdtCOg2kucr4qcH/AArmXMigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgJoCKAUBOKAUBFAVyO5Bxg52z7qxqSPRce5W+0U89g7D2oyJB/VO/wCBNabapipjuZLunmm323OCT47xgPZJyPga9SJ5cujMZpcHHlTUTpzufLy461EpJFlBs8hLkhQepA9wzXCdZJZOsKTbwdA4f4DSYgyzkL4kL+weP1HWsnxjb7G34JJdzrvC/DVnaIvcRrzHB7wj126+Ph8K669SODjpeMFhjQKxbOc8oA8sVRl9WUl2POxRlB58bnbHgMDY+/OfrSJNWUXjSfWjE99ceXOn9z/tVVyUfCNtViBQCgFAKAUAoBQCgFAKAUAoBQE0BFAKAmgJxQHy7AAk7Abn4CgW5zC57RrmWRzaRwJAgyXn5jtkhWPKwILbYQBm+PhldeTfy/k+jh4PSpxXnOTk+kf7rp1eyLDwhxd6Srd+QPtlijcRmNHZlYhVBkck4XO+PaWulOpq5PPvrDyWtHbLWcte+yLhiux5hBoBQHMib1FKxW6YGSuZT8s+rWLRg9HzU92UriDS9buchnjWM/cjOxHkSdzXWGmLz1OFScpJroVq+4Iv8jEBYDHQr0+vhW/4mODz1RaNeeB9QJ3hI+Yri62Xk7KnhYPv/wAA3h9pT/186o6mSdODJi4AuMbjfbcDepdVYJUNy36fw9fRoFFy5x5hTgeXSszUW+DZGpJLktmhelwx8pXvDzZJZuXw+7gbfDeukHhHGs9TyzcRarIuzQN4DIbIGD45+fhV9ZzUEzNXWU5hFk87YwCGHX3kYzUqRXTsb/TbcoGLD1mbJ+gA/Z+NWKmZQEUAoCaAUAoBQCgIoBQE0BFATQCgFAKAUAoDRazxCYbV7uKESQxo0hdpBGrooP8AFHlYuTgYyApBBBNdadPXNQzuyGzNtdUje3hmlKxCaNGCSMFILqG5DnGSM4qjg02lvglPqVW+4GtXkSBbhY4EziBcc7SvzHndi3M2VBAGBgKcYGa4Ohn2PVp+L1Y5k1mb6vouyRk6TaWsPdymde4t5DDCsavyCd27tmd9zLIWPLnopJHXeukaDTSx6/3M1W9lUUu8uX/JdkWtbuMtyCRC+SOUMObKgFhjOcgFSfLIq2GYyVuoy5iEimQDJQMCwG25XqBuPrTDxkHrUA0girhg7ZPGeAY6UwGzGMNSUPkwCowWPk24qMAj0ceVRgkyI4h0/wAKlInLMtLYY2AxXTBRk+iDyBqMEZINovXFMDJtbNsoPdtXRFWe1SQKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgK6+izXL8l4IhaxSh4YoWYhwmREJlKKMDIJQEjKr5b9lUUF8nLX+YIwTJwfC8glkkldhc+keuVIOCxjhO2e6QkFV8CgNFXklhdsf39xg9bPhiOK5lulkbvZlUPlYvbUMBKvqZVsMemx8qh1m4qL4QwaC8jFrcwWywXMotkM6yCOEROx9TDPybyhQx29Y87HJOK6xWqLllLO3r/ogwLa1SHl7u3uw6x3C+kDkL89wUaWblMfN3nqDGEx6528ujk5Ldrpt7cEG74T7v0nmW2njLWwA7wepGFdSy+yAJX515uue592Txq50crn/Pt/UlFvrOWNZXE7HlcUKsxaECoJR8mpJIoySVp1Bnw9BUlD1arEBqBmTZeyfif2CpiQzIqxAoBQCgFARQE0AoBQEUBNAKAUAoBQCgFAQaAUAoBQErQE0BBqAQakH//Z",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-04072019oDlYX.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "d",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">A driver is stepping out of the car.<p>\n<p class="option-content">The traffic sign is being taken down.<p>\n<p class="option-content">No cars are on the road today.<p>\n<p class="option-content">The vehicles are stopped at a traffic light.<p>',
              giaiThich:
                '<p class="option-translation">Một tài xế đang bước ra khỏi xe.<p>\n<p class="option-translation">Một biển báo giao thông đang được tháo xuống.<p>\n<p class="option-translation">Không có chiếc xe nào trên đường hôm nay.<p>\n<p class="option-translation">Những chiếc xe đang dừng chờ đèn giao thông.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "https://nghetienganhpro.com/wp-content/uploads/2016/09/hacker.png",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-06122019v2UTO.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Practice_Tests/Part_1/sub_audios/gMQur_3.mp3",
          listQuestion: [
            {
              cauDung: "d",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">The man is at his desk.<p>\n<p class="option-content">He is in his office.<p>\n<p class="option-content">The man is by the entrance.<p>\n<p class="option-content">The man is near the board.<p>',
              giaiThich:
                '<p class="option-translation">Người đàn ông đang ngồi ở bàn của mình.<p>\n<p class="option-translation">Anh ấy đang ở trong văn phòng.<p>\n<p class="option-translation">Người đàn ông đang ở bên cạnh cửa ra vào.<p>\n<p class="option-translation">Người đàn ông ở gần cái bảng.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "https://tailieutoeic.com/wp-content/uploads/2019/06/le-phi-thi-toeic.jpg",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-16032020lC0Hw.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "a",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">The cassette tape is damaged.<p>\n<p class="option-content">The cassette tape is brand new.<p>\n<p class="option-content">The cassette tape is on sale.<p>\n<p class="option-content">There are many cassette tape on the keyboard.<p>',
              giaiThich:
                '<p class="option-translation">Băng cassette bị hư.<p>\n<p class="option-translation">Băng cassette mới hoàn toàn.<p>\n<p class="option-translation">Băng cassette đang được bán giảm giá.<p>\n<p class="option-translation">Có rất nhiều băng cassette trên bàn phím.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "https://tienganhmoingay.com/media/images/uploads/2019/08/26/lam-de-thi-thu-toeic.png",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-12022020LkAqW.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "b",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">People are throwing away some boxes.<p>\n<p class="option-content">People are handling boxes together.<p>\n<p class="option-content">People are opening packages.<p>\n<p class="option-content">People are exchanging files.<p>',
              giaiThich:
                '<p class="option-translation">Nhiều người đang vứt các vài chiếc hộp đi.<p>\n<p class="option-translation">Nhiều người đang bốc những chiếc hộp xuống cùng nhau.<p>\n<p class="option-translation">Nhiều người đang mở các gói hàng ra.<p>\n<p class="option-translation">Nhiều người đang trao đổi các tài liệu.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsM0qXv5nFXYePJJqxwsPjSyzn1FtU_HRpn9Ak2g4nPAopwnoQ&usqp=CAU",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-20012020xETrV.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "a",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">The woman is giving a presentation.<p>\n<p class="option-content">The woman is drawing a picture.<p>\n<p class="option-content">She is changing clothes.<p>\n<p class="option-content">She is serving food.<p>',
              giaiThich:
                '<p class="option-translation">Người phụ nữ đang thuyết trình.<p>\n<p class="option-translation">Người phụ nữ đang vẽ tranh.<p>\n<p class="option-translation">Cô ấy đang thay đồ.<p>\n<p class="option-translation">Cô ấy đang phục vụ thức ăn.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsM0qXv5nFXYePJJqxwsPjSyzn1FtU_HRpn9Ak2g4nPAopwnoQ&usqp=CAU",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-03042020pGr8M.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "a",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">He\'s working with some small tools.<p>\n<p class="option-content">He\'s turning on a desk lamp.<p>\n<p class="option-content">He\'s hammering nails into some wood.<p>\n<p class="option-content">He\'s reading from a piece of paper.<p>',
              giaiThich:
                '<p class="option-translation">Anh ấy đang làm việc với vài dụng cụ nhỏ.<p>\n<p class="option-translation">Anh ấy đang bật đèn bàn lên.<p>\n<p class="option-translation">Anh ấy đang đóng đinh vào gỗ.<p>\n<p class="option-translation">Anh ấy đang đọc một miếng giấy.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsM0qXv5nFXYePJJqxwsPjSyzn1FtU_HRpn9Ak2g4nPAopwnoQ&usqp=CAU",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-29012020eKK4u.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "d",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">Two women are sitting at the dock.<p>\n<p class="option-content">The boat is being tied to the pier.<p>\n<p class="option-content">They are rowing the boat toward the ship.<p>\n<p class="option-content">The boat is floating in the water.<p>',
              giaiThich:
                '<p class="option-translation">Hai người phụ nữ đang ngồi tại một cái bến.<p>\n<p class="option-translation">Con thuyền đang được cột vào cột bến.<p>\n<p class="option-translation">Họ đang chèo thuyền đến con tàu.<p>\n<p class="option-translation">Con thuyền đang nổi trên nước.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "data:image/jpeg;base64,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",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-01012020uc379.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "a",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">A board is being measured.<p>\n<p class="option-content">Wood has been stacked in a pile.<p>\n<p class="option-content">Some lumber\'s being carried.<p>\n<p class="option-content">The construction site has been abandoned.<p>',
              giaiThich:
                '<p class="option-translation">Một tấm gỗ đang được đo.<p>\n<p class="option-translation">Gỗ đã được chất thành một chồng.<p>\n<p class="option-translation">Một ít gỗ đang được nâng.<p>\n<p class="option-translation">Công trường xây dựng đã bị bỏ hoang.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "data:image/jpeg;base64,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",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-31012020UYDK8.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "b",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">Pedestrians are crossing the street.<p>\n<p class="option-content">Some vehicles are stopped in traffic.<p>\n<p class="option-content">Goods are being unloaded from a truck.<p>\n<p class="option-content">Some people are getting off their motorbikes.<p>',
              giaiThich:
                '<p class="option-translation">Nhiều người đi bộ đang đi qua đường.<p>\n<p class="option-translation">Vài chiếc xe đã dừng lại trên đường.<p>\n<p class="option-translation">Hàng hóa đang được dỡ khỏi một xe tải.<p>\n<p class="option-translation">Vài người đang leo xuống khỏi mô tô của mình.<p>'
            }
          ]
        },
        {
          transcript: "",
          linkImage:
            "data:image/jpeg;base64,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",
          typeListen: 0,
          linkMp3:
            "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-07112019BR9NA.mp3'></audio>",
          srcMp3:
            "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
          listQuestion: [
            {
              cauDung: "b",
              cauC: "",
              cauD: "",
              transcript: "",
              cauA: "",
              cauB: "",
              cauHoi: "",
              goiY:
                '<p class="option-content">The animal is being led into the pen.<p>\n<p class="option-content">The animal is being fed.<p>\n<p class="option-content">The zoo is very crowded today.<p>\n<p class="option-content">The boy is attending to the animal.<p>',
              giaiThich:
                '<p class="option-translation">Con vật đang được dẫn vào chuồng.<p>\n<p class="option-translation">Con vật đang được cho ăn.<p>\n<p class="option-translation">Vườn thú hôm nay rất đông.<p>\n<p class="option-translation">Cậu bé đang chăm sóc cho con vật.<p>'
            }
          ]
        }
      ]
    }
  };

  ngOnDestroy() {
    this.clearTimer();
  }

  ngOnInit() {
    this.countDown();
    this.start();
    this.titleService.setTitle("PHẦN 1 MÔ TẢ HÌNH ẢNH");
    this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
    this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
    this.goiY = this.baiTests.listen.listening[
      this.indexCauHoi
    ].listQuestion[0].goiY;
    this.giaiThich = this.baiTests.listen.listening[
      this.indexCauHoi
    ].listQuestion[0].giaiThich;
    this.cauDung = this.baiTests.listen.listening[
      this.indexCauHoi
    ].listQuestion[0].cauDung;
    this.checkCauTiepTheo = true;
    this.showCorrect = false;
  }

  items: RadioButtonItem[] = [
    { name: "A", value: "a" },
    { name: "B", value: "b" },
    { name: "C", value: "c" },
    { name: "D", value: "d" }
  ];

  nextCauHoi() {
    this.selectedItem1 = "";
    this.checkOpenModalOrNextCauHoi = false;
    this.checkUserChooseAnswer = true;
    this.checkGiaiThich = false;
    this.checkGoiY = false;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    if (this.checkOpenModalNextCauHoi) {
      this.modalRef.hide();
    }
    this.checkOpenModalNextCauHoi = false;

    if (this.indexCauHoi < 5) {
      if (this.selectedItem) {
        this.indexCauHoi += 1;
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
      } else {
        this.indexCauHoi += 1;
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[ 
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
      }
    } else {
      this.start();
      this.router.navigate(['/ket-qua-bai-thi'], {
        state: { 
          score: this.score,
          hours: this.hours,
          minute: this.minute,
          seconds: this.seconds,
          totalCorrect: this.totalCorrect,
          part: 'part1',
          totalQuestion: 6
          }
      });
    }
  }
  checkTongKet: boolean = false;
  selectedItem1: any;
  score: number = 0;
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.checkGoiY = true;
    this.show = false;
    this.selectedItem1 = this.selectedItem;
    const dapAnDung = this.baiTests.listen.listening[this.indexCauHoi]
      .listQuestion[0].cauDung;
    if (this.selectedItem == dapAnDung) {
      this.score += 100/6;
      this.showCorrect = true;
      this.selectedItem = "";
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
      this.selectedItem = "";
    }
    setTimeout(() => this.removeAlert(), 1000);
  }

  clickGoiY() {
    this.show = !this.show;
  }

  clickXemLoiGiai() {
    this.checkGiaiThich = !this.checkGiaiThich;
  }

  removeAlert() {
    this.showCorrect = false;
    this.showInCorrect = false;
  }

  // playMp3(mp3) {
  //   this.checkPlayMp3 = 1;
  //   if (this.audio) {
  //     this.audio.pause();
  //     this.audio = null;
  //   }
  //   this.audio = new Audio(mp3);
  //   this.audio.load();
  //   alert(this.audio.duration);
  //   this.audio.play();
  // }
}

export interface RadioButtonItem {
  name: string;
  value: string;
}

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

let nextUniqueId = 0;

@Component({
  selector: "radio-button",
  providers: [RADIO_VALUE_ACCESSOR],
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"]
})
export class RadioButtonComponent implements ControlValueAccessor {
  private _name: string = `group-${nextUniqueId++}`;

  @Input() items: Array<RadioButtonItem>;

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  private innerValue: string | number | boolean;
  get value(): string | number | boolean {
    return this.innerValue;
  }

  set value(v: string | number | boolean) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.change(v);
    }
  }

  onChange: Function;
  onTouched: Function;

  writeValue(value: string | number | boolean) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  isDisabled1(): boolean {
    return false;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  change(value: string | number | boolean) {
    // console.log(value);
    this.innerValue = value;
    this.onChange(value);
    this.onTouched(value);
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { trigger, style, animate, transition } from "@angular/animations";
import { Title } from "@angular/platform-browser";
import { forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  // faTrashAlt,
  // faSquare,
  // faCheckSquare,
  faEnvelopeOpen,
  faArrowAltCircleRight,
  faCheckCircle,
  faLightbulb,
  faWindowMaximize
} from "@fortawesome/free-regular-svg-icons";
import { Router } from '@angular/router';

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

export class BaiTest1Component implements OnInit, OnDestroy {

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
  "listen": {
    "listening": [
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-01012020HJP6q.mp3'></audio>",
        "srcMp3": "https://tienganhmoingay.com/static/ToeicTests/audios/Ets_Toeic_2019_Test_1/questions_audios/1.mp3",
        "listQuestion": [
          {
            "cauDung": "a",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> I could always handwrite the letter. <span>→<span class=\"question-translation\">Tôi luôn có thể viết tay lá thư.<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option correct-option\">\n   (A) \n  <span class=\"option-content\">That would seem more personal.<span> → \n  <span class=\"option-translation\">Như vậy có vẻ mang tính cá nhân hơn.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">Mary wrote the letter this morning.<span> → \n  <span class=\"option-translation\">Mary viết thư sáng nay.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">I will hand it to her when I get there.<span> → \n  <span class=\"option-translation\">Tôi sẽ đưa nó cho cô ấy khi tôi đến đó.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-10012020kqkfl.mp3'></audio>",
        "srcMp3": "https://tienganhmoingay.com/static/ToeicTests/audios/Practice_Tests/Part_2/sub_audios/P2pdh_1.mp3",
        "listQuestion": [
          {
            "cauDung": "b",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> When are you planning to go to Los Angeles? <span>→<span class=\"question-translation\">Bạn định khi nào thì đến Los Angeles?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">To meet my friends there.<span> → \n  <span class=\"option-translation\">Để gặp bạn tôi ở đó.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">Later this year.<span> → \n  <span class=\"option-translation\">Cuối năm nay.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">No, I didn't plan on it.<span> → \n  <span class=\"option-translation\">Không, tôi không định làm vậy.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-071020198GwWZ.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-071020198GwWZ.mp3",
        "listQuestion": [
          {
            "cauDung": "b",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Who is Ms. Leon going to select as her assistant? <span>→<span class=\"question-translation\">Bà Leon sẽ chọn ai để làm trợ lý vậy?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">Yes, she was selected as a secretary.<span> → \n  <span class=\"option-translation\">Vâng, cô ấy được chọn làm thư ký.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">One of the new employees.<span> → \n  <span class=\"option-translation\">Một trong những nhân viên mới.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Because we're short-handed now.<span> → \n  <span class=\"option-translation\">Bởi vì chúng ta bị thiếu nhân công.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-15022020PWmBN.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-15022020PWmBN.mp3",
        "listQuestion": [
          {
            "cauDung": "a",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Where do you suggest I stay in Singapore? <span>→<span class=\"question-translation\">Bạn nghĩ tôi nên ở đâu ở Singapore?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option correct-option\">\n   (A) \n  <span class=\"option-content\">Your best bet is the Hotel International.<span> → \n  <span class=\"option-translation\">Tốt nhất là ở khách sạn Quốc tế.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">I always suggest places to stay.<span> → \n  <span class=\"option-translation\">Tôi luôn đề nghị nơi để ở.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Your stay in Singapore is paid for.<span> → \n  <span class=\"option-translation\">Chuyến viếng thăm của bạn ở Singapore đã được chi trả rồi.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-18032020vJRpj.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-18032020vJRpj.mp3",
        "listQuestion": [
          {
            "cauDung": "b",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> What time is the meeting? <span>→<span class=\"question-translation\">Cuộc họp lúc mấy giờ?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">It's in London.<span> → \n  <span class=\"option-translation\">Nó ở Luân Đôn.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">I think it starts at 10 a.m.<span> → \n  <span class=\"option-translation\">Tôi nghĩ nó bắt đầu lúc 10 giờ sáng.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Yes, it was really informative.<span> → \n  <span class=\"option-translation\">Vâng, nó cung cấp rất nhiều thông tin.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-06032020EKJ8w.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-06032020EKJ8w.mp3",
        "listQuestion": [
          {
            "cauDung": "c",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Whose design has been selected? <span>→<span class=\"question-translation\">Thiết kế của ai được chọn vậy?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">He got elected.<span> → \n  <span class=\"option-translation\">Anh ta được bầu.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">The design looks good.<span> → \n  <span class=\"option-translation\">Thiết kế trông đẹp.<span> \n <div> \n <div class=\"option correct-option\">\n   (C) \n  <span class=\"option-content\">They're making the decision now.<span> → \n  <span class=\"option-translation\">Giờ họ đang đưa ra quyết định.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-31012020yhqG3.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-31012020yhqG3.mp3",
        "listQuestion": [
          {
            "cauDung": "b",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Why did you purchase the more expensive cassette recorder? <span>→<span class=\"question-translation\">Vì sao bạn mua máy ghi băng cassette đắt tiền hơn?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">No, I didn't.<span> → \n  <span class=\"option-translation\">Không, tôi đâu có.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">It has more functions.<span> → \n  <span class=\"option-translation\">Nó có nhiều chức năng hơn.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">The recorder can be bought at any electronics store.<span> → \n  <span class=\"option-translation\">Máy ghi có thể được mua tại bất kỳ cửa hàng điện tử nào.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-20012020VOkVZ.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-20012020VOkVZ.mp3",
        "listQuestion": [
          {
            "cauDung": "b",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Who is making the hotel reservation? <span>→<span class=\"question-translation\">Ai sẽ đặt phòng khách sạn?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">The hotel was already booked.<span> → \n  <span class=\"option-translation\">Khách sạn đã được đặt kín rồi.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">Perhaps Mr. Chang.<span> → \n  <span class=\"option-translation\">Có lẽ ông Chang.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Submit it by e-mail.<span> → \n  <span class=\"option-translation\">Nộp qua email.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-08042020TBMAd.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-08042020TBMAd.mp3",
        "listQuestion": [
          {
            "cauDung": "b",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Can you paint very well? <span>→<span class=\"question-translation\">Bạn vẽ có đẹp không?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">My favorite color is blue.<span> → \n  <span class=\"option-translation\">Màu yêu thích của tôi là dương.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">Yes, I took lessons for five years.<span> → \n  <span class=\"option-translation\">Có, tôi đã học trong năm năm.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">He is not home right now.<span> → \n  <span class=\"option-translation\">Giờ anh ta không có ở nhà.<span> \n <div> \n<div>"
          }
        ]
      },
      {
        "transcript": "",
        "linkImage": "",
        "typeListen": 0,
        "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-01012020dBZwA.mp3'></audio>",
        "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-01012020dBZwA.mp3",
        "listQuestion": [
          {
            "cauDung": "c",
            "cauC": "",
            "cauD": "null",
            "transcript": "",
            "cauA": "",
            "cauB": "",
            "cauHoi": "",
            "goiY": "<span class=\"question-content \"> Did you pay cash or in installments? <span>→<span class=\"question-translation\">Bạn đã trả tiền mặt hay trả góp?<span>",
            "giaiThich": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">It was installed last week.<span> → \n  <span class=\"option-translation\">Nó được cài đặt tuần trước.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">Sorry, I don't have any cash on me now.<span> → \n  <span class=\"option-translation\">Xin lỗi, giờ tôi không có tiền mặt.<span> \n <div> \n <div class=\"option correct-option\">\n   (C) \n  <span class=\"option-content\">I get billed monthly.<span> → \n  <span class=\"option-translation\">Họ tính tiền tôi theo tháng.<span> \n <div> \n<div>"
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
    this.titleService.setTitle("Phần 2 HỎI - ĐÁP");
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
    { name: "C", value: "c" }
  ];

  nextCauHoi() {
    // this.pause();
    // lam
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
          part: 'part2',
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

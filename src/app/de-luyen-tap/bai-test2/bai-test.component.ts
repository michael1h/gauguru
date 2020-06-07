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
import { RadioButtonItemPart3 } from '../bai-test/IRadio.model';

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
export class BaiTest2Component implements OnInit, OnDestroy {

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
          "transcript": "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">M: <span class=\"q1804-1\">Art historians say that this painting is a significant contribution to the field.<span> Do you like it?<br><span> <span class=\"paragraph-sentence\">W: I have to admit that art history was never my strong subject, so I'm not sure what my opinion's worth. I can say that I'm drawn to the painting, but I'm never sure I can tell what abstract art is trying to express.<br><span> <span class=\"paragraph-sentence\">M: Neither can I, but I still think it's a beautiful painting. <span class=\"q1805-1\">I admire the use of color.<span><br><span> <span class=\"paragraph-sentence\">W: Well, yes. <span class=\"q1806-1\">Fortunately, the museum's collection covers a wide spectrum of styles.<span> They've acquired some really interesting pieces. It's certainly worth the price of admission.<span><p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">M: Những nhà lịch sử học về nghệ thuật nói rằng bức họa này là một đóng góp to lớn đến lĩnh vực này. Bạn có thích nó không?<br><span> <span class=\"paragraph-sentence\">W: Tôi phải thừa nhận rằng lịch sử nghệ thuật chưa bao giờ là chủ đề tôi giỏi, nên tôi không chắc rằng ý kiến của tôi có giá trị. Tôi có thể nói rằng tôi bị cuốn hút bởi bức họa, nhưng tôi không bao giờ chắc chắn là tôi có thể nói bức nghệ thuật trừu tượng đang cố truyền tải điều gì.<br><span> <span class=\"paragraph-sentence\">M: Tôi cũng không thể, nhưng tôi vẫn nghĩ đó là bức hoạ đẹp. Tôi ngưỡng mộ cách sử dụng màu.<br><span> <span class=\"paragraph-sentence\">W: Vâng, đúng vậy. May mắn là, bộ sưu tập của bảo tàng bao gồm một dải rộng các phong cách. Họ đã thu thập được một vài tác phẩm rất thú vị. Nó chắc chắn xứng đáng với giá vào cửa.<span><p>",
          "linkImage": "data:image/jpeg;base64,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",
          "typeListen": 1,
          "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-280220209MGyb.mp3'><\" + \"/\" + \"audio>",
          "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-280220209MGyb.mp3",
          "listQuestion": [
            {
              "cauDung": "c",
              "cauC": "<span class=\"option-content\">A painting.<span>",
              "cauD": "<span class=\"option-content\">A photograph.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">A drawing.<span> → \n  <span class=\"option-translation\">Một bức tranh chì hoặc bút mực.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">A sculpture.<span> → \n  <span class=\"option-translation\">Một bức tượng.<span> \n <div> \n <div class=\"option correct-option\">\n   (C) \n  <span class=\"option-content\">A painting.<span> → \n  <span class=\"option-translation\">Một bức họa bằng sơn.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">A photograph.<span> → \n  <span class=\"option-translation\">Một tấm hình.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">A drawing.<span>",
              "cauB": "<span class=\"option-content\">A sculpture.<span>",
              "cauHoi": "<span class=\"question-content \"> What are the speakers discussing? <span>",
              "goiY": "<span class=\"question-content \"> What are the speakers discussing? <span>→<span class=\"question-translation\">Những người nói đang thảo luận về điều gì?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1804-1\">Art historians say that this painting is a significant contribution to the field. <span>\" -&gt; Chọn C. \n<div>"
            },
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">The style.<span>",
              "cauD": "<span class=\"option-content\">The subject.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">The size.<span> → \n  <span class=\"option-translation\">Kích thước.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">The color.<span> → \n  <span class=\"option-translation\">Màu sắc.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">The style.<span> → \n  <span class=\"option-translation\">Phong cách.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">The subject.<span> → \n  <span class=\"option-translation\">Chủ đề.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">The size.<span>",
              "cauB": "<span class=\"option-content\">The color.<span>",
              "cauHoi": "<span class=\"question-content \"> What does the man like about it? <span>",
              "goiY": "<span class=\"question-content \"> What does the man like about it? <span>→<span class=\"question-translation\">Người đàn ông thích điều gì về bức họa?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1805-1\">I admire the use of color. <span>\" -&gt; Chọn B. \n<div>"
            },
            {
              "cauDung": "d",
              "cauC": "<span class=\"option-content\">It's not very interesting.<span>",
              "cauD": "<span class=\"option-content\">The collection is varied.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">The admission fee is too expensive.<span> → \n  <span class=\"option-translation\">Giá vào cổng quá đắt.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">They should acquire more works.<span> → \n  <span class=\"option-translation\">Họ nên thu thập nhiều tác phẩm hơn.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">It's not very interesting.<span> → \n  <span class=\"option-translation\">Nó không quá thú vị.<span> \n <div> \n <div class=\"option correct-option\">\n   (D) \n  <span class=\"option-content\">The collection is varied.<span> → \n  <span class=\"option-translation\">Bộ sưu tập đa dạng.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">The admission fee is too expensive.<span>",
              "cauB": "<span class=\"option-content\">They should acquire more works.<span>",
              "cauHoi": "<span class=\"question-content \"> What does the woman say about the museum? <span>",
              "goiY": "<span class=\"question-content \"> What does the woman say about the museum? <span>→<span class=\"question-translation\">Người phụ nữ nói gì về bảo tàng?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1806-1\">Fortunately, the museum's collection covers a wide spectrum of styles. <span>\" -&gt; Bộ sưu tập của bảo tàng đa dạng về phong cách -&gt; Chọn D. \n<div>"
            }
          ]
        },
        {
          "transcript": "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">M: Good evening. And welcome to Sophie's Garden.<br><span> <span class=\"paragraph-sentence\">W: <span class=\"q1657-1\">Thanks. Can you tell more about today's special menu please?<span><br><span> <span class=\"paragraph-sentence\">M: Well, you can choose from two starters, two main courses and two desserts. Coffee is also included. <span class=\"q1658-1\">Oh, and you will receive a complimentary glass of red or white wine.<span><br><span> <span class=\"paragraph-sentence\">W: That sounds great. <span class=\"q1659-1\">Give me a moment to think about it.<span> Can you come back in a few minutes?<span><p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">M: Chào buổi chiều. Và chào mừng tới Khu vườn của Sophie.<br><span> <span class=\"paragraph-sentence\">W: Cảm ơn. Bạn có thể nói thêm về thực đơn đặc biệt của hôm nay không?<br><span> <span class=\"paragraph-sentence\">M: Vâng, bạn có thể trong chọn hai món khai vị, hai món chính và hai món tráng miệng. Bao gồm cả cà phê. Ồ, và bạn sẽ được nhận một ly rượu đỏ hoặc rượu trắng kèm theo miễn phí.<br><span> <span class=\"paragraph-sentence\">W: Nghe tuyệt đấy. Cho tôi ít thời gian để nghĩ về việc đó. Bạn có thể quay lại trong một vài phút nữa không?<span><p>",
          "linkImage": "",
          "typeListen": 1,
          "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-01012020KDCsd.mp3'><\" + \"/\" + \"audio>",
          "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-01012020KDCsd.mp3",
          "listQuestion": [
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">The brand of coffee available.<span>",
              "cauD": "<span class=\"option-content\">The year of the wine served.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">The price of the special menu.<span> → \n  <span class=\"option-translation\">Giá của thực đơn đặc biệt.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">Today's selection of food.<span> → \n  <span class=\"option-translation\">Những món được chọn hôm nay.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">The brand of coffee available.<span> → \n  <span class=\"option-translation\">Nhãn hàng cà phê đang có sẵn.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">The year of the wine served.<span> → \n  <span class=\"option-translation\">Năm ủ của món rượu được phục vụ.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">The price of the special menu.<span>",
              "cauB": "<span class=\"option-content\">Today's selection of food.<span>",
              "cauHoi": "<span class=\"question-content \"> What does the woman want to know? <span>",
              "goiY": "<span class=\"question-content \"> What does the woman want to know? <span>→<span class=\"question-translation\">Người phụ nữ muốn biết về điều gì?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1657-1\">Thanks. Can you tell more about today's special menu please? <span>\" -&gt; Chọn B. \n<div>"
            },
            {
              "cauDung": "a",
              "cauC": "<span class=\"option-content\">Appetizer.<span>",
              "cauD": "<span class=\"option-content\">Soup.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option correct-option\">\n   (A) \n  <span class=\"option-content\">Drinks.<span> → \n  <span class=\"option-translation\">Đồ uống.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">Dessert.<span> → \n  <span class=\"option-translation\">Món tráng miệng.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Appetizer.<span> → \n  <span class=\"option-translation\">Món khai vị.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">Soup.<span> → \n  <span class=\"option-translation\">Súp.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Drinks.<span>",
              "cauB": "<span class=\"option-content\">Dessert.<span>",
              "cauHoi": "<span class=\"question-content \"> What is being offered at no cost? <span>",
              "goiY": "<span class=\"question-content \"> What is being offered at no cost? <span>→<span class=\"question-translation\">Món gì được phục vụ miễn phí?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1658-1\">Oh, and you will receive a complimentary glass of red or white wine. <span>\" -&gt; Rượu được tặng kèm theo -&gt; Chọn A. \n<div>"
            },
            {
              "cauDung": "c",
              "cauC": "<span class=\"option-content\">Think of what to eat.<span>",
              "cauD": "<span class=\"option-content\">Eat her food.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">Order food.<span> → \n  <span class=\"option-translation\">Yêu cầu món ăn.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">Pay for her meal.<span> → \n  <span class=\"option-translation\">Trả tiền cho bữa ăn của cô ấy.<span> \n <div> \n <div class=\"option correct-option\">\n   (C) \n  <span class=\"option-content\">Think of what to eat.<span> → \n  <span class=\"option-translation\">Nghĩ nên ăn cái gì.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">Eat her food.<span> → \n  <span class=\"option-translation\">Ăn thức ăn của cô ấy.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Order food.<span>",
              "cauB": "<span class=\"option-content\">Pay for her meal.<span>",
              "cauHoi": "<span class=\"question-content \"> What will the woman most likely do next? <span>",
              "goiY": "<span class=\"question-content \"> What will the woman most likely do next? <span>→<span class=\"question-translation\">Người phụ nữ rất có thể sẽ làm gì tiếp theo?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1659-1\">Give me a moment to think about it. <span>\" -&gt; Chọn C. \n<div>"
            }
          ]
        },
        {
          "transcript": "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">M: I didn't have time this monring <span class=\"q1013-1\">to check to see if the morning class has been cancelled or not.<span> <br><span> <span class=\"paragraph-sentence\">W: I did, Mr. Lee, and <span class=\"q1013-2\">enough students have enrolled. The class is going to be open.<span><br><span> <span class=\"paragraph-sentence\">M: That's great. I guess I am going to have to start preparing for the Monday class then. Would you do me a favor and <span class=\"q1014-1\">run off some copies of this for me?<span> <br><span> <span class=\"paragraph-sentence\">W: Of course. I'll have them ready for you before lunch today.<span><p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">M: Sáng nay tôi không có thời gian để kiểm tra xem liệu lớp sáng nay có bị hủy hay không. <br><span> <span class=\"paragraph-sentence\">W: Tôi đã kiểm tra rồi, ông Lee, và có đủ số học sinh đăng ký. Lớp sẽ được mở. <br><span> <span class=\"paragraph-sentence\">M: Tuyệt. Tôi nghĩ tôi phải bắt đầu chuẩn bị cho lớp học ngày thứ Hai. Cô có thể giúp tôi một chuyện là photo mấy bản của cái này cho tôi được không? <br><span> <span class=\"paragraph-sentence\">W: Được. Tôi sẽ làm xong chúng cho ông trước giờ ăn trưa hôm nay.<span><p>",
          "linkImage": "",
          "typeListen": 1,
          "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-08042020nC5Hc.mp3'><\" + \"/\" + \"audio>",
          "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-08042020nC5Hc.mp3",
          "listQuestion": [
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">A secretary<span>",
              "cauD": "<span class=\"option-content\">A receptionist<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">A student<span> → \n  <span class=\"option-translation\">Một học sinh<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">A teacher<span> → \n  <span class=\"option-translation\">Một giáo viên<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">A secretary<span> → \n  <span class=\"option-translation\">Một thư ký<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">A receptionist<span> → \n  <span class=\"option-translation\">Một nhân viên lễ tân<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">A student<span>",
              "cauB": "<span class=\"option-content\">A teacher<span>",
              "cauHoi": "<span class=\"question-content \"> Who most likely is Mr. Lee? <span>",
              "goiY": "<span class=\"question-content \"> Who most likely is Mr. Lee? <span>→<span class=\"question-translation\">Ông Lee có thể là ai?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Dựa vào nội dung bài hội thoại, ta biết ông Lee là giáo viên \n<div>"
            },
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">How to use the copy machine<span>",
              "cauD": "<span class=\"option-content\">If the woman is prepared for the class<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">Whether the woman is going to take the class or not<span> → \n  <span class=\"option-translation\">Người phụ nữ có định học lớp này không<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">If enough students have enrolled<span> → \n  <span class=\"option-translation\">Liệu có đủ học sinh đăng ký học không<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">How to use the copy machine<span> → \n  <span class=\"option-translation\">Cách sử dụng máy photo<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">If the woman is prepared for the class<span> → \n  <span class=\"option-translation\">Liệu người phụ nữ đã chuẩn bị cho lớp học<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Whether the woman is going to take the class or not<span>",
              "cauB": "<span class=\"option-content\">If enough students have enrolled<span>",
              "cauHoi": "<span class=\"question-content \"> What does the man want to know? <span>",
              "goiY": "<span class=\"question-content \"> What does the man want to know? <span>→<span class=\"question-translation\">Người đàn ông muốn biết gì?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ông Lee nói \" \n <span class=\"quote quote-q1013-1\">to check to see if the morning class has been cancelled or not. <span>\" và người phụ nữ đáp \" \n <span class=\"quote quote-q1013-2\">enough students have enrolled. The class is going to be open. <span>\" \n<div>"
            },
            {
              "cauDung": "a",
              "cauC": "<span class=\"option-content\">Call him in the monring<span>",
              "cauD": "<span class=\"option-content\">Have lunch with him<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option correct-option\">\n   (A) \n  <span class=\"option-content\">Make some copies<span> → \n  <span class=\"option-translation\">Photo<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">Run down to the store<span> → \n  <span class=\"option-translation\">Đi xuống cửa hàng<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Call him in the monring<span> → \n  <span class=\"option-translation\">Gọi cho ông ta vào buổi sáng<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">Have lunch with him<span> → \n  <span class=\"option-translation\">Ăn trưa với ông ta<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Make some copies<span>",
              "cauB": "<span class=\"option-content\">Run down to the store<span>",
              "cauHoi": "<span class=\"question-content \"> What does the man ask the woman to do? <span>",
              "goiY": "<span class=\"question-content \"> What does the man ask the woman to do? <span>→<span class=\"question-translation\">Người đàn ông yêu cầu người phụ nữ làm gì?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý này trong câu \" \n <span class=\"quote quote-q1014-1\">run off some copies of this for me? <span>\" \n<div>"
            }
          ]
        },
        {
          "transcript": "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">W: Hello. <span class=\"q2131-1\">I'm calling to express my dissatisfaction with a tent I purchased from your sporting goods store yesterday<span>.<br><span> <span class=\"paragraph-sentence\">M: OK. I can assist you with that. What seems to be the problem?<br><span> <span class=\"paragraph-sentence\">W: <span class=\"q2132-1\">Well, neither of the two largest poles came in the box<span>. I have the other poles and pegs but am unable to assemble the tent.<br><span> <span class=\"paragraph-sentence\">M: I apologize for the inconvenience, ma'am. <span class=\"q2133-1\">We'll gladly provide you with the missing parts if you bring your receipt to our shop within 30 days<span>.<br><span> <span class=\"paragraph-sentence\">W: All right. <span class=\"q2133-2\">I'll do that this afternoon, since my office is near the shopping center your store is in<span>.<span><p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Người phụ nữ: Xin chào. Tôi đang gọi để bày tỏ sự không hài lòng với một chiếc lều tôi mua từ cửa hàng đồ thể thao của bạn ngày hôm qua.<br><span> <span class=\"paragraph-sentence\">Người đàn ông: Được rồi. Tôi có thể giúp bà với điều đó. Điều gì có thể vấn đề vậy?<br><span> <span class=\"paragraph-sentence\">Người phụ nữ: Chà, cả hai cọc lớn nhất đều không có trong hộp. Tôi có các cọc và chốt khác nhưng không thể lắp ráp lều.<br><span> <span class=\"paragraph-sentence\">Người đàn ông: Tôi xin lỗi vì sự bất tiện này, thưa bà. Chúng tôi sẵn sàng cung cấp cho bà các bộ phận còn thiếu nếu bà mang hóa đơn đến cửa hàng của chúng tôi trong vòng 30 ngày.<br><span> <span class=\"paragraph-sentence\">Người phụ nữ: Được rồi. Tôi sẽ làm điều đó chiều nay, vì văn phòng của tôi ở gần trung tâm mua sắm nơi có cửa hàng của bạn.<span><p>",
          "linkImage": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-30032020htQUp.png",
          "typeListen": 1,
          "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-30032020M0229.mp3'><\" + \"/\" + \"audio>",
          "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-30032020M0229.mp3",
          "listQuestion": [
            {
              "cauDung": "c",
              "cauC": "<span class=\"option-content\">To make a complaint.<span>",
              "cauD": "<span class=\"option-content\">To request a refund.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">To purchase a product.<span> → \n  <span class=\"option-translation\">Để mua một sản phẩm.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">To confirm a delivery.<span> → \n  <span class=\"option-translation\">Để xác nhận một cuộc giao hàng.<span> \n <div> \n <div class=\"option correct-option\">\n   (C) \n  <span class=\"option-content\">To make a complaint.<span> → \n  <span class=\"option-translation\">Để khiếu nại.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">To request a refund.<span> → \n  <span class=\"option-translation\">Để yêu cầu hoàn lại tiền.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">To purchase a product.<span>",
              "cauB": "<span class=\"option-content\">To confirm a delivery.<span>",
              "cauHoi": "<span class=\"question-content \"> Why does the woman place the call? <span>",
              "goiY": "<span class=\"question-content \"> Why does the woman place the call? <span>→<span class=\"question-translation\">Tại sao người phụ nữ thực hiện cuộc gọi?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q2131-1\">I'm calling to express my dissatisfaction with a tent I purchased from your sporting goods store yesterday<span>\" -&gt; Chọn C. \n<div>"
            },
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">Piece C.<span>",
              "cauD": "<span class=\"option-content\">Piece D.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">Piece A.<span> → \n  <span class=\"option-translation\">Bộ phận A.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">Piece B.<span> → \n  <span class=\"option-translation\">Bộ phận B.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Piece C.<span> → \n  <span class=\"option-translation\">Bộ phận C.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">Piece D.<span> → \n  <span class=\"option-translation\">Bộ phận D.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Piece A.<span>",
              "cauB": "<span class=\"option-content\">Piece B.<span>",
              "cauHoi": "<span class=\"question-content \"> Look at the graphic. What was not included in the box? <span>",
              "goiY": "<span class=\"question-content \"> Look at the graphic. What was not included in the box? <span>→<span class=\"question-translation\">Nhìn vào hình. Những gì không được bao gồm trong hộp?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q2132-1\">Well, neither of the two largest poles came in the box<span>\" -&gt; Nhìn vào hình, ta thấy bộ phận dài nhất là B -&gt; Chọn B. \n<div>"
            },
            {
              "cauDung": "a",
              "cauC": "<span class=\"option-content\">Receive a store gift certificate.<span>",
              "cauD": "<span class=\"option-content\">Return a recently purchased item.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option correct-option\">\n   (A) \n  <span class=\"option-content\">Visit a retail establishment.<span> → \n  <span class=\"option-translation\">Ghé thăm một cơ sở bán lẻ.<span> \n <div> \n <div class=\"option \">\n   (B) \n  <span class=\"option-content\">Shop for a similar product online.<span> → \n  <span class=\"option-translation\">Mua một sản phẩm tương tự trực tuyến.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Receive a store gift certificate.<span> → \n  <span class=\"option-translation\">Nhận một phiếu quà tặng của cửa hàng.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">Return a recently purchased item.<span> → \n  <span class=\"option-translation\">Trả lại một mặt hàng đã mua gần đây.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Visit a retail establishment.<span>",
              "cauB": "<span class=\"option-content\">Shop for a similar product online.<span>",
              "cauHoi": "<span class=\"question-content \"> What will the woman probably do later today? <span>",
              "goiY": "<span class=\"question-content \"> What will the woman probably do later today? <span>→<span class=\"question-translation\">Người phụ nữ có thể sẽ làm gì vào lúc sau trong hôm nay?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q2133-1\">We'll gladly provide you with the missing parts if you bring your receipt to our shop within 30 days<span>\" và câu \" \n <span class=\"quote quote-q2133-2\">I'll do that this afternoon, since my office is near the shopping center your store is in<span>\" -&gt; Người phụ nữ sẽ ghé thăm cơ sản bán dụng cụ thể thao để trình một tờ biên lai -&gt; Chọn A. \n<div>"
            }
          ]
        },
        {
          "transcript": "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">W: <span class=\"q1909-1\">Did you remember to pick up the medicine at the pharmacy while you were at the mall<span>?<br><span> <span class=\"paragraph-sentence\">M: I did, but you wouldn't believe how long the line was. I stood there waiting nearly half an hour. <span class=\"q1910-1\">I should have just gone to the supermarket across the road from here. They carry most of the over-the-counter drugs.<span><br><span> <span class=\"paragraph-sentence\">W: <span class=\"q1911-1\">True, but they're closed today. Did you forget that they don't open on Tuesday?<span><br><span> <span class=\"paragraph-sentence\">M: Ah, that's right. Well, I guess the wait was worth it then. I could have ended up going back to the mall again.<span><p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">W: Bạn có nhớ lấy thuốc tại tiệm thuốc trong lúc bạn ở khu mua sắm không?<br><span> <span class=\"paragraph-sentence\">M: Tôi có, nhưng bạn sẽ không tin là hàng người chờ dài thế nào đâu. Tôi đứng đó chờ gần nửa tiếng. Tôi lẽ ra nên đi đến siêu thị bên kia đường từ đây. Họ bày bán hầu hết các loại thuốc không cần kê đơn ở đây.<br><span> <span class=\"paragraph-sentence\">W: Đúng vậy, nhưng họ đóng cửa hôm nay. Bạn quên là họ không mở vào thứ ba à?<br><span> <span class=\"paragraph-sentence\">M: À, đúng rồi. Vâng, vậy thì tôi đoán là việc đứng chờ là xứng đáng. Tôi có thể đã phải quay ngược trở lại khu mua sắm.<span><p>",
          "linkImage": "",
          "typeListen": 1,
          "linkMp3": "<audio style='width:100%' controls controlsList='nodownload'> <source src='http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-17022020ppRcA.mp3'><\" + \"/\" + \"audio>",
          "srcMp3": "http://35.240.134.172/toeic/static/upload/thi-thu-toeic-de-ngay-17022020ppRcA.mp3",
          "listQuestion": [
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">To rent a video.<span>",
              "cauD": "<span class=\"option-content\">To buy a movie ticket.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">To buy some groceries.<span> → \n  <span class=\"option-translation\">Để mua một số rau củ quả.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">To get some medicine.<span> → \n  <span class=\"option-translation\">Để lấy một số thuốc.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">To rent a video.<span> → \n  <span class=\"option-translation\">Để thuê một cuộn băng.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">To buy a movie ticket.<span> → \n  <span class=\"option-translation\">Để mua vé xem phim.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">To buy some groceries.<span>",
              "cauB": "<span class=\"option-content\">To get some medicine.<span>",
              "cauHoi": "<span class=\"question-content \"> Why did the man go to the mall? <span>",
              "goiY": "<span class=\"question-content \"> Why did the man go to the mall? <span>→<span class=\"question-translation\">Tại sao người đàn ông đi đến khu mua sắm?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong câu \" \n <span class=\"quote quote-q1909-1\">Did you remember to pick up the medicine at the pharmacy while you were at the mall<span>\" -&gt; Chọn B. \n<div>"
            },
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">It takes about half an hour to get there on foot.<span>",
              "cauD": "<span class=\"option-content\">It opens early on Tuesdays.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">It is located in the mall.<span> → \n  <span class=\"option-translation\">Nó nằm trong khu mua sắm.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">it sells over-the-counter drugs.<span> → \n  <span class=\"option-translation\">Nó bán thuốc không cần kê đơn.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">It takes about half an hour to get there on foot.<span> → \n  <span class=\"option-translation\">Mất gần nửa tiếng để đi bộ đến đó.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">It opens early on Tuesdays.<span> → \n  <span class=\"option-translation\">Nó mở sớm vào thứ ba.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">It is located in the mall.<span>",
              "cauB": "<span class=\"option-content\">it sells over-the-counter drugs.<span>",
              "cauHoi": "<span class=\"question-content \"> What does the man mention about the supermarket? <span>",
              "goiY": "<span class=\"question-content \"> What does the man mention about the supermarket? <span>→<span class=\"question-translation\">Người đàn ông đề cập điều gì về siêu thị?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong đoạn \" \n <span class=\"quote quote-q1910-1\">I should have just gone to the supermarket across the road from here. They carry most of the over-the-counter drugs. <span>\" -&gt; Chọn B. \n<div>"
            },
            {
              "cauDung": "b",
              "cauC": "<span class=\"option-content\">Wednesday.<span>",
              "cauD": "<span class=\"option-content\">Thursday.<span>",
              "transcript": "<div class=\"options-wrapper\"> \n <div class=\"option \">\n   (A) \n  <span class=\"option-content\">Monday.<span> → \n  <span class=\"option-translation\">Thứ hai.<span> \n <div> \n <div class=\"option correct-option\">\n   (B) \n  <span class=\"option-content\">Tuesday.<span> → \n  <span class=\"option-translation\">Thứ ba.<span> \n <div> \n <div class=\"option \">\n   (C) \n  <span class=\"option-content\">Wednesday.<span> → \n  <span class=\"option-translation\">Thứ tư.<span> \n <div> \n <div class=\"option \">\n   (D) \n  <span class=\"option-content\">Thursday.<span> → \n  <span class=\"option-translation\">Thứ năm.<span> \n <div> \n<div>",
              "cauA": "<span class=\"option-content\">Monday.<span>",
              "cauB": "<span class=\"option-content\">Tuesday.<span>",
              "cauHoi": "<span class=\"question-content \"> What day is it today? <span>",
              "goiY": "<span class=\"question-content \"> What day is it today? <span>→<span class=\"question-translation\">Hôm nay là ngày thứ mấy?<span>",
              "giaiThich": "<div class=\"explanation\">\n  Ta thấy ý trong đoạn \" \n <span class=\"quote quote-q1911-1\">True, but they're closed today. Did you forget that they don't open on Tuesday? <span>\" -&gt; Chọn B. \n<div>"
            }
          ]
        }
      ]
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  arrayQuestionAnswer = [];

  ngOnInit() {
    this.start();
    this.titleService.setTitle("Phần 3 ĐOẠN HỘI THOẠI");
    const total = this.baiTests.listen.listening[0].listQuestion.length;
    for (let i = 0; i < total; i++) {
      this.arrayQuestionAnswer.push('a', 'a');
      console.log(this.arrayQuestionAnswer);
    }
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
    this.countDown();
  }

  items: RadioButtonItemPart3[] = [
    { name: "A", value: "a", question: "arr you ok" },
    { name: "B", value: "b", question: "arr you ok1" },
    { name: "C", value: "c", question: "arr you ok2" }
  ];

  question: string;

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

    if (this.indexCauHoi < 3) {
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
          part: 'part3',
          totalQuestion: 4
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

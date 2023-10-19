import React, { useContext, useState } from "react";
import BrandingIndex from "../Branding/BrandingIndex";
import NewsCategoriesIndex from "../NewsCategories/NewsCategoriesIndex";
import BreakingNewsIndex from "../BreakinNews/BreakingNewsIndex";
import HomeLayout from "./HomeLayout";
import Footerlayout from "../Footer/Footerlayout";
import footerImage1 from "@/Components/assets/footerimg1.jpg";
import footerimg2 from "@/Components/assets/footerimg2 (1).jpeg";
import footerimg3 from "@/Components/assets/footerimg3(2).jpeg";
import axios from "axios";
import { ApiList } from "@/Components/Api/ApiList";
import { ApiJsonHeader } from "@/Components/Api/ApiJsonHeader";
import ContentIndex from "../Content/ContentIndex";
import hemantsoren from "@/Components/assets/hemantsoren.jpeg";
import Raghuadas from "@/Components/assets/Raghuadas.jpeg";
import stationRoad from "@/Components/assets/stationRoad.jpeg";
import jharkhandpolice from "@/Components/assets/jharkhandpolice.jpeg";
import Orrisaweather from "@/Components/assets/Orrisaweather.jpeg";
import OrmanjhiZoo from "@/Components/assets/OrmanjhiZoo.jpeg";
import Rojgaaryozna from "@/Components/assets/Rojgaaryozna.jpeg";
import smartcityhospital from "@/Components/assets/smartcityhospital.jpeg";
import vishnupandal from "@/Components/assets/vishnupandal.jpeg";
import bannagupta from "@/Components/assets/bannagupta.jpeg";
import Policealert from "@/Components/assets/Policealert.jpeg";
import transferorder from "@/Components/assets/transferorder.jpeg";

const HomeIndex = () => {
  const { apiGetNewsById } = ApiList();

  const [bClose, setBClose] = useState(true);
  const [pageToggle, setPageToggle] = useState(false);
  const [pageData, setPageData] = useState({
      bigNews: {},
      smallNews: [],
      rightMenu: {},
    });

  let wpx =
    JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  const brandingMenu = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/" },
    { title: "Contact Us", path: "/" },
    { title: "Apply For Job", path: "/career" },
  ];

  const newsCategoriesMenu = [
    { title: "होम", path: "/", subMenu: [] },
    { title: "मुख्य समाचार", path: "/", subMenu: [] },
    { title: "झारखंड", path: "/", subMenu: [] },
    { title: "बिहार", path: "/", subMenu: [] },
    { title: "राज्य", path: "/", subMenu: [] },
    { title: "देश", path: "/", subMenu: [] },
    { title: "मनोरंजन", path: "/", subMenu: [] },
    { title: "व्यापार", path: "/", subMenu: [] },
    { title: "टैकनोलजी", path: "/", subMenu: [] },
    { title: "राशिफल", path: "/", subMenu: [] },
    { title: "धार्मिक", path: "", subMenu: [] },
    {
      title: "खेल",
      path: "",
      subMenu: [
        { title: "क्रिकेट", path: "#" },
        { title: "हॉकी", path: "#" },
      ],
    },
  ];
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/cWTTDvKUFdY?si=OEP67HkZ-RcgDafN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  var data = [
    {
      bigNews: {
        image: hemantsoren,
        heading:
          "सीएम हेमंत सोरेन व कल्पना सोरेन से जेसोवा के प्रतिनिधिमंडल ने की मुलाकात",
        content:
          "रांची : मुख्यमंत्री हेमंत सोरेन एवं उनकी धर्मपत्नी कल्पना सोरेन से कांके रोड स्थित मुख्यमंत्री आवासीय कार्यालय में झारखंड आईएएस ऑफिसर्स वाइव्स एशोसिएशन (जेसोवा) के एक प्रतिनिधिमंडल ने मुलाकात की. इस अवसर पर मुख्यमंत्री को प्रतिनिधिमंडल ने आगामी दो नवंबर से छह नवंबर, 2023 तक मोरहाबादी स्थित आर्मी मैदान में आयोजित होने वाले जेसोवा दिवाली मेला-2023 की तैयारियों से अवगत कराया. इस मौके पर प्रतिनिधिमंडल ने जेसोवा दीवाली मेला-2023 के उद्घाटन समारोह में मुख्यमंत्री को बतौर मुख्य अतिथि एवं उनकी धर्मपत्नी को विशिष्ट अतिथि के रूप में सम्मिलित होने के लिए आमंत्रित  किया. इस मौके पर मुख्यमंत्री के प्रधान सचिव वंदना दादेल, जेसोवा की अध्यक्ष मिनी सिंह,  उपाध्यक्ष नमिता सिंह एवं प्रीति कुमार, सचिव मनु झा, सदस्य निक्की टोप्पो,  जेसिना सिद्दीकी, रंजना कुमार उपस्थित थीं.	",
        author: "Kanhaiya Taleja",
        id: 1,
        date: "Oct 19, 2023",
      },

      smallNews: [
        {
          image: hemantsoren,
          heading:
            "सीएम हेमंत सोरेन व कल्पना सोरेन से जेसोवा के प्रतिनिधिमंडल ने की मुलाकात",
          content: "",
          sections: [
            {
              title:
                "सीएम हेमंत सोरेन व कल्पना सोरेन से जेसोवा के प्रतिनिधिमंडल ने की मुलाकात",
              content:
                "रांची : मुख्यमंत्री हेमंत सोरेन एवं उनकी धर्मपत्नी कल्पना सोरेन से कांके रोड स्थित मुख्यमंत्री आवासीय कार्यालय में झारखंड आईएएस ऑफिसर्स वाइव्स एशोसिएशन (जेसोवा) के एक प्रतिनिधिमंडल ने मुलाकात की. इस अवसर पर मुख्यमंत्री को प्रतिनिधिमंडल ने आगामी दो नवंबर से छह नवंबर, 2023 तक मोरहाबादी स्थित आर्मी मैदान में आयोजित होने वाले जेसोवा दिवाली मेला-2023 की तैयारियों से अवगत कराया. इस मौके पर प्रतिनिधिमंडल ने जेसोवा दीवाली मेला-2023 के उद्घाटन समारोह में मुख्यमंत्री को बतौर मुख्य अतिथि एवं उनकी धर्मपत्नी को विशिष्ट अतिथि के रूप में सम्मिलित होने के लिए आमंत्रित  किया. इस मौके पर मुख्यमंत्री के प्रधान सचिव वंदना दादेल, जेसोवा की अध्यक्ष मिनी सिंह,  उपाध्यक्ष नमिता सिंह एवं प्रीति कुमार, सचिव मनु झा, सदस्य निक्की टोप्पो,  जेसिना सिद्दीकी, रंजना कुमार उपस्थित थीं.",
            },
          ],
          id: 1,
          date: "Oct., 2023",
        },
        {
          image: stationRoad,
          heading:
            " Durga Puja 2023: जननी व जन्मभूमि की थीम पर बना रांची रेलवे स्टेशन पूजा पंडाल ",
          id: 2,
          sections: [
            {
              title:
                "Durga Puja 2023: जननी व जन्मभूमि की थीम पर बना रांची रेलवे स्टेशन पूजा पंडाल",
              content:
                "रांची : राजधानी में दुर्गा पूजा को लेकर कई भव्य पंडाल का निर्माण किया जा रहा है.  रांची रेलवे स्टेशन दुर्गा पूजा पंडाल कई मायने में खास है. हर साल अलग-अलग थीम पर आधारित पूजा पंडाल का निर्माण किया जाता है. इस बार जननी और जन्मभूमि को दर्शाया गया है. बेटी बचाओ बेटी पढ़ाओ के साथ जननी और जन्मभूमि थीम पर आधारित इस पंडाल के केंद्र में बेटियां है. करीब 35 लाख की लागत से बने इस पंडाल को देखकर सीखने और समझने को काफी कुछ मिलेगा. 20 फीट चौड़े और 100 फीट लंबे इस पंडाल की ऊंचाई 35 फीट है पंडाल के अंदर प्रवेश करते ही आपको अलग तरह की मिलेगी अनुभूति इस पंडाल में प्रवेश करते की आपको मां के गर्भ में पल रहे शिशु और नारी का अलग-अलग रूप देखने को मिलेगा. पंडाल में यह भी दिखाने की कोशिश की गई है अगर बेटी नहीं रही, तो सृष्टि का सृजन रुक जाएगा और तब मानव सभ्यता में सिर्फ कंकाल ही दिखेगा.20 फीट की घड़ी का करेंगे दीदार लोहे आदि से बने 20 फीट की घड़ी भी देखने को मिलेगा. इसमें दिखाया गया है कि घड़ी बंद होने और इसके पीछे की कहानी क्या है. मां नहीं रही, तो सृष्टि का विकास रुक जाएगा. महिषासुर के प्रारूप को भी आप देख पाएंगे भ्रूण हत्या रोक पर जोरम्यूजिकल थीम पर आधारित पूरे पंडाल का निर्माण हुआ है. सृष्टि की रचना से लेकर भारत के मानचित्र पर मां दुर्गा विराजमान है. भ्रूण हत्या पर रोक और सनातन व हिंदू धर्म के प्रति लोगों को जागरूक करने पर जोर दिया गया है",
            },
          ],
          date: "Oct., 2023",
        },
        {
          image: jharkhandpolice,
          heading:
            "कुमार गौरव बने रांची के ट्रैफिक एसपी, 23 आईपीएस अधिकारियों की ट्रांसफर-पोस्टिंग",
          sections: [
            {
              title:
                "कुमार गौरव बने रांची के ट्रैफिक एसपी, 23 आईपीएस अधिकारियों की ट्रांसफर-पोस्टिंग",
              content:
                " रांची : झारखंड सरकार ने 23 आईपीएस अधिकारियों की ट्रांसफर-पोस्टिंग की है. इसमें कई पदस्थापन की प्रतीक्षा में थे. वहीं, कई डीएसपी से एसपी बने अधिकारियों को जिम्मेवारी दी गई है. इस संबंध में गृह, कारा एवं आपदा प्रबंधन विभाग ने अधिसूचना जारी की है.  जानें कौन अधिकारी कहां गये : अधिकारी : कहां थे : कहां गये चंदन कुमार झा : पदस्थापन की प्रतीक्षा में : एसपी, झारखंड सशस्त्र पुलिस प्रशिक्षण केंद्र, पद्रमा, हजारीबागअनुरंजन किस्पोट्टा : पदस्थापन की प्रतीक्षा में : एसपी, अपराध अनुसंधान विभाग अंबर लकड़ा : पदस्थापन की प्रतीक्षा में : समादेष्टा, झारखंड सशस्त्र पुलिस- 3, गोविंदपुर, धनबाद अंजनी कुमार झा : पदस्थापन की प्रतीक्षा में : एसपी, भ्रष्टाचार निरोधक ब्यूरो  आनंद प्रकाश : पदस्थापन की प्रतीक्षा में : एसपी, तकनीकी सेवाएं एवं संचार, रांचीप्रभात कुमार : पदस्थापन की प्रतीक्षा में : समादेष्टा, झारखंड सशस्त्र पुलिस-6, जमशेदपुरएहतेशाम वकारीब : पदस्थापन की प्रतीक्षा में : एसपी, भ्रष्टाचार निरोधक ब्यूरो, रांची आर रामकुमार : पदस्थापन की प्रतीक्षा में : एसपी, एससीआरबी, रांची अमित रेणू : पदस्थापन की प्रतीक्षा में : एसपी, अभियान (नक्सल)  कुमार गौरव : पदस्थापन की प्रतीक्षा में : ट्रैफिक एसपी, रांची   मुकेश कुमार लुनायत : पदस्थापन की प्रतीक्षा में : सिटी एसपी, जमशेदपुर  मनोज स्वर्गियारी : पदस्थापन की प्रतीक्षा में : एसपी, रेल, धनबाद   मनोज स्वर्गियारी : पदस्थापन की प्रतीक्षा में : एसपी, रेल, धनबाद शुभांशु जैन : पदस्थापह की प्रतीक्षा में : एसपी, विशेष शाखा ( एसाआईबी), रांची   सरोजनी लकड़ा : अपर पुलिस अधीक्षक, संचार एवं तकनीकी सेवाएं, रांची   एमेल्डा एक्का : अपर पुलिस अधीक्षक, भ्रष्टाचार निरोधक ब्यूरो, रांची  सादिक अनवर रिजवी : वरीय पुलिस उपाधीक्षक, भ्रष्टाचार निरोधक ब्यूरो, रांची : एसपी, भ्रष्टाचार निरोधक ब्यूरो, रांची  अरविंद कुमार सिंह :  वरीय पुलिस उपाधीक्षक, मुख्यालय-3, धनबाद :  समादेष्टा, झारखंड सशस्त्र पुलिस-5, देवघर  विकास कुमार पांडेय : वरीय पुलिस उपाधीक्षक, जंगल वारफेयर स्कूल, नेतरहाट : एसपी, सीटीसी मुसाबनी   अजय कुमार सिन्हा : वरीय पुलिस उपाधीक्षक, विशेष शाखा, रांची : एसपी, अनुसंधान प्रशिक्षण विद्यालय, रांची  सहदेव साव : वरीय पुलिस उपाधीक्षक, भ्रष्टाचार निरोधक ब्यूरो, रांची : एसपी, भ्रष्टाचार निरोधक ब्यूरो, रांची  अमित कुमार सिंह : वरीय पुलिस उपाधीक्षक, बड़कागांव, हजारीबाग : समादेष्टा, गृह रक्षा वाहिनी एवं अग्निशमन सेवाएं, रांची   मुकेश कुमार : वरीय पुलिस उपाधीक्षक, मुख्यालय, बोकारो : समादेष्टा, एसआईएसएफ, बोकारो ",
            },
          ],
          id: 3,
          date: "Oct., 2023",
        },
        {
          image: Orrisaweather,
          heading:
            "Weather Update :  पर्व त्योहार में साफ रहेगा मौसम, पहाडों की ठंडी हवाओं का होगा आगमन ",
          sections: [
            {
              title:
                "Weather Update :  पर्व त्योहार में साफ रहेगा मौसम, पहाडों की ठंडी हवाओं का होगा आगमन",
              content:
                "रांची : राज्य भर में मौसम का मिजाज पूरी तरह बदल गया है. सुबह -शाम ठंडी हवाएं चलने लगी है और ठंड का एहसास भी होने लगा है. मौसम विभाग से मिली जानकारी के अनुसार, अब दक्षिण-पश्चिम मानसून की विदाई हो गई है जिससे राज्य के मौसम में बदलाव देखे जा रहे हैं. विभाग के अनुसार, राज्य में मानसून कि बारिश नहीं होगी और पहाडों से ठंडी हवाओं का आना शुरू होगा. वहीं, धीरे-धीरे तापमान में गिरावट दर्ज की जाएगी और ठंड बढेगी. दुर्गा पूजा में साफ़ रहेगा मौसम : मौसम विभाग के रिपोर्ट के अनुसार, दुर्गा पूजा के दौरान बारिश होनी की कोई संभावना नहीं हैं. 20 और 21 अक्टूबर, 2023 को आसमान में बादल देखने को मिल सकते हैं. इस दौरान पूरे राज्य में कहीं भी बारिश के आसार नहीं है. मौसम विभाग ने कहा है कि अब तापमान में गिरवाट देखने को मिलेगी. सुबह-शाम  कोहरा भी देखने को मिलेगा. जाने रांची का मौसम पूर्वानुमान19 अक्टूबर : आसमान मुख्यतः साफ रहेगा, अधिकतम तापमान 29 डिग्री, वहीं न्यूनतम तापमान 17 डिग्री रहने का अनुमान है. 20 अक्टूबर : आसमान मुख्यतः साफ रहेगा, अधिकतम तापमान 28 डिग्री,  वहीं न्यूनतम तापमान 17 डिग्री.21 अक्टूबर : आसमान मुख्यतः साफ रहेगा. अधिकतम तापमान 29 डिग्री, वहीं न्यूनतम तापमान 18 डिग्री. 22 अक्टूबर : आसमान मुख्यतः साफ रहेगा. अधिकतम तापमान 28 डिग्री, वहीं न्यूनतम तापमान  19 डिग्री., 23 अक्टूबर : आंशिक बादल छाये रह सकते हैं, अधिकतम तापमान 27 डिग्री, वहीं न्यूनतम तापमान 17 डिग्री.",
            },
          ],
          id: 4,
          date: "Oct., 2023",
        },
        {
          image: OrmanjhiZoo,
          heading: "PVUNL ने बिरसा जू में एशियाई शेरों को लिया गोद",
          sections: [
            {
              title: "PVUNL ने बिरसा जू में एशियाई शेरों को लिया गोद",
              content:
                "रांची: वन्यजीव संरक्षण के प्रयासों को बढ़ावा देने के लिए पतरातू विद्युत उत्पादन निगम लिमिटेड यानी पीवीयूएनएल एक महत्वपूर्ण कदम उठाया गया है. पीवीयूएनएल ने बिरसा जैविक उद्यान में एशियाई शेरों को गोद लिया है. इसने 30 सितंबर, 2024 तक एशियाई शेर के जोड़े जया और वीरू को गोद लेने के समझौते को नवीनीकृत किया है. बता दें कि वन्यजीव संरक्षण के बारे में जागरूकता बढ़ाने के लिए पीवीयूएनएल ने जया और वीरू के परिसर के आसपास एक प्रमुख साइनबोर्ड लगाया है. इस साइनबोर्ड में प्राकृतिक विरासत को संरक्षित करने के महत्व पर जोर देते हुए पर्यावरण के प्रति जिम्मेदारी की भावना को बढ़ावा देते हैं..",
            },
          ],
          id: 5,
          date: "Oct., 2023",
        },
        {
          image: Rojgaaryozna,
          heading:
            "मुख्यमंत्री रोजगार सृजन योजना के लाभुक को गोड्डा डीसी ने सौंपी स्कॉर्पियो की चाबी",
          sections: [
            {
              title:
                "मुख्यमंत्री रोजगार सृजन योजना के लाभुक को गोड्डा डीसी ने सौंपी स्कॉर्पियो की चाबी",
              content:
                "रांची : कल्याण विभाग द्वारा संचालित मुख्यमंत्री रोजगार सृजन योजना के तहत गोड्डा जिले के पोड़ैयाहाट प्रखंड अंतर्गत विरनियां गांव के लाभुक सुनील कुमार यादव को डीसी ने स्कॉर्पियो की चाबी सौंपी. इस मौके पर डीसी ने कहा कि वित्तीय वर्ष 2022-23 में 156 आवेदनों को कल्याण विभाग के विभिन्न निगमों  द्वारा स्वीकृति दी गई है, जिन्हें जिला कल्याण कार्यालय के माध्यम से ऋण प्रदान किया जा रहा है. 400 से अधिक आवेदन ऑनलाइन अपलोड  वर्तमान वित्तीय वर्ष में लगभग 400 से अधिक आवेदनों को अभी तक ऑनलाइन अपलोड करते हुए संबंधित निगमों को भेजने की कारवाई जिला प्रशासन की ओर से की जा रही है. डीसी ने कहा कि जिला प्रशासन द्वारा जिले के युवाओं के विकास की दिशा में कार्य किया जा रहा है. जहां एक ओर युवाओं के स्वरोजगार/रोजगार के लिए विभिन्न प्रशिक्षण कार्यक्रम चलाए जा रहे हैं.  वहीं, दूसरी ओर स्वरोजगार/ रोजगार को प्रोत्साहित करने के लिए मुख्यमंत्री रोजगार सृजन योजना जैसे योजनाओं का संचालन जिला कल्याण विभाग के माध्यम से किया जा रहा है. इन स्वरोजगार/ रोजगार योजनाओं में युवाओं को अपने व्यवसाय के लिए ऋण देने के साथ ही अनुदान भी प्रदान किए जाते हैं. आज जिले के अनेक युवा इन कल्याणकारी योजना का लाभ लेकर खुद का व्यवसाय कर अपने परिवार को एक बेहतर जिंदगी जीने के साथ अन्य को भी रोजगार देने के लिए सक्षम हो गए हैं. वहीं, जिला कल्याण पदाधिकारी अविनाश कुमार ने बताया कि मुख्यमंत्री रोजगार सृजन योजना के तहत झारखंड के अनुसूचित जनजाति, पिछड़ा वर्ग और दिव्यांग युवाओं के लिए सावधि ऋण और ऋण सब्सिडी का प्रावधान है. योजना का उद्देश्य  इस योजना  का मुख्य उद्देश्य अनुसूचित जनजाति (एसटी), अनुसूचित जाति (एससी), पिछड़ा वर्ग (बीसी) से संबंधित युवाओं को कम ब्याज दर पर ऋण और ऋण सब्सिडी प्रदान करना है. साथ ही अल्पसंख्यक और दिव्यांग श्रेणी को उद्यम शुरू करने/स्वरोजगार को बढ़ावा देने का अवसर प्रदान करता है. लाभुक ने मुख्यमंत्री का जताया आभार इधर, इस योजना के लाभुक सुनील प्रसाद यादव ने स्कॉर्पियो मिलने पर खुशी जाहिर की. साथ ही, मुख्यमंत्री हेमंत सोरेन का आभार प्रकट किया. इस मौके पर कल्याण विभाग के कर्मी समेत अन्य मौजूद थे.",
            },
          ],
          id: 6,
          date: "Oct., 2023",
        },
        {
          image: smartcityhospital,
          heading:
            "रांची स्मार्ट सिटी अपोलो मल्टी सुपर स्पेशियलिटी हॉस्पिटल का होगा निर्माण, सीएम ने भूमि पूजन का दिया निर्देश ",
            sections: [
              {
                title:
                  "रांची स्मार्ट सिटी अपोलो मल्टी सुपर स्पेशियलिटी हॉस्पिटल का होगा निर्माण, सीएम ने भूमि पूजन का दिया निर्देश",
                content: "रांची : राज्य में स्वास्थ्य व्यवस्था को मजबूत करने को लेकर हेमंत सरकार गंभीर है. इसको लेकर मुख्यमंत्री ने 15 नवंबर को राज्य स्थापना दिवस के अवसर पर रांची स्मार्ट सिटी परिसर में अपोलो मल्टी सुपर स्पेशियलिटी हॉस्पिटल के भूमि पूजन करने का निर्देश दिया है. इसके तहत रांची नगर निगम और अपोलो हॉस्पिटल इंटरप्राइजेज लिमिटेड, चेन्नई के बीच सब लीज डीड पर हस्ताक्षर हुआ. सीएम ने कहा कि राज्य में सरकारी अस्पतालों की व्यवस्था मजबूत करने के साथ निजी अस्पताल खोलने के लिए सरकार कई रियायतें दे रही हैं हेल्थ इंफ्रास्ट्रक्चर पर सरकार दे रही विशेष ध्यान  मुख्यमंत्री ने कहा कि राज्य में स्वास्थ्य व्यवस्था को मजबूत बनाने की दिशा में सरकार लगातार प्रयास कर रही है, ताकि जनता को बेहतर और आधुनिक चिकित्सीय  सुविधा मिल सके. कहा कि झारखंड में स्वास्थ्य व्यवस्था बेहतर नहीं रही है. ऐसे में वर्ष 2019 में सरकार के गठन के साथ ही स्वास्थ्य सेवाओं में सुधार की दिशा में लगातार काम हो रहा है. इस कड़ी में सरकारी अस्पतालों में इंफ्रास्ट्रक्चर को मजबूत किया जा रहा है. जांच और इलाज की आधुनिक सुविधाएं उपलब्ध कराई जा रही है. चिकित्सकों एवं पारा मेडिकल कर्मियों की नियुक्तियां हो रही है. वहीं, निजी क्षेत्र के अस्पताल यहां स्थापित हों,  इसके लिए भी लगातार प्रयास हो रहे हैं, ताकि लोगों को बेहतर इलाज के लिए राज्य के बाहर और बड़े शहरों का रुख नहीं करना पड़े 15 नवंबर को अस्पताल का भूमि पूजन करने का निर्देश उन्होंने अपोलो हॉस्पिटल इंटरप्राइजेज लिमिटेड, चेन्नई प्रबंधन से कहा कि वह इस अपोलो मल्टी सुपर स्पेशियलिटी हॉस्पिटल को जल्द से जल्द शुरू करें. इस मौके पर उन्होंने अस्पताल का भूमि पूजन 15 नवंबर, 2023 को राज्य स्थापना दिवस के मौके पर करने का निर्देश दिया. वहीं, अस्पताल प्रबंधन ने मुख्यमंत्री को बताया कि जल्द ही 250 बेड के अस्पताल निर्माण का कार्य शुरू हो जाएगा. पहले चरण में यहां ओपीडी की शुरुआत होगी. कहा कि अस्पताल में स्थानीय लोगों को रोजगार उपलब्ध कराया जाएगा. सामान्य चिकित्सक और पारा मेडिकल कमी भी झारखंड के होंगे, जबकि विभिन्न विभागों में विशेषज्ञ  चिकित्सकों की नियुक्ति की जाएगी. रोजगार के नए अवसर भी बनेंगे  मुख्यमंत्री ने उम्मीद जताई कि अपोलो हॉस्पिटल इंटरप्राइजेज लिमिटेड के साथ यह समझौता विश्व स्तरीय स्वास्थ्य सुविधा उपलब्ध कराने की दिशा में मिल का पत्थर साबित होगा. इसके लोगों को बेहतर स्वास्थ्य सेवाओं का लाभ दे सकेंगे. इससे यहां रोजगार के नए अवसर भी सृजित होंगे. 45 वर्षों के सब लीज पर दी जा रही जमीन बता दें कि रांची के घाघरा में अपोलो हॉस्पिटल के निर्माण के लिए रांची नगर निगम द्वारा अपोलो हॉस्पिटल इंटरप्राइजेज के साथ चार सितंबर, 2014 को एकरारनामा किया गया था. लेकिन, इस भूमि के विषय पर विवाद की वजह से  स्थल परिवर्तन करते हुए रांची स्मार्ट सिटी क्षेत्र में अपोलो अस्पताल के लिए भूमि उपलब्ध करने का निर्णय लिया गया. यहां लगभग 2.75 एकड़ भूमि पर हॉस्पिटल निर्माण होगा. इसके लिए जमीन का सब लीज फिलहाल 45 वर्षों के लिया किया जा रहा है, जो भविष्य में कार्य की गुणवत्ता को देखते हुए विस्तारित किया जा सकेगा. 250 बेड का मल्टी स्पेशियलिटी हॉस्पिटल बनेगा बताया गया कि अपोलो हॉस्पिटल इंटरप्राइजेज द्वारा रांची स्मार्ट सिटी परिसर में लगभग 2.75 एकड़ जमीन में 250 बेड वाले मल्टी सुपर स्पेशलिटी हॉस्पिटल का निर्माण किया जाएगा. यहां विशेष रूप से कार्डियोलॉजी, ऑर्थोपोडिक, गायनोकॉलोजी, जेनरल सर्जरी, जेनरल मेडिसिन, पीडियाट्रिक्स, ईएनटी सेवा प्रदान की जायेगी. इसके अलावा इमरजेंसी सेवा, रेडियोलोजी, पैथोलॉजी, डाइटरी सर्विसेस की भी व्यस्था यहां होगी. अपोलो हॉस्पिटल में 24 घंटे एंबुलेंस सेवा उपलब्ध रहेगी. हॉस्पिटल के अंदर पार्किंग, फार्मेसी, एटीएम, कैंटीन आदि की व्यवस्था भी रहेगी. डेढ़ लाख लोग सीधे तौर पर होंगे लाभान्वित रांची स्मार्ट सिटी परिसर में कई इंस्टीट्यूशंस, स्कूल, कॉलेज, पांच सितारा समेत कई होटल, मॉल, ऑफिस तथा व्यवसायिक प्रतिष्ठानो का निर्माण होना है. साथ ही एक मेडिकल कॉलेज का भी निर्माण निर्धारित है. इसके अलावा यहां लगभग 16 हजार आवासीय इकाई होंगे और अनुमानित है कि लगभग डेढ़ लाख की जनसंख्या इस विकसित क्षेत्र में निवास करेगी, जो इस परियोजना से सीधे रूप से लाभान्वित होगी. इनकी रही उपस्थिति इस अवसर पर मुख्यमंत्री के सचिव विनय कुमार चौबे, रांची नगर निगम के प्रशासक अमीत कुमार,  सूडा निदेशक अमित कुमार, रांची स्मार्ट सिटी कारपोरेशन के जीएम राकेश कुमार नंदकुलियार, रांची नगर निगम के सहायक प्रशासक ज्योति कुमार सिंह, आईटी ऑफिसर राजेश कुमार तथा अपोलो हॉस्पिटल इंटरप्राइजेज लिमिटेड, चेन्नई के वाईस प्रेसिडेंट डॉ करण ठाकुर एवं आर्किटेक्चरल कंसलटेंट रोशन जॉन चिरायत मौजूद थे. ",
              },
            ],
          id: 7,
          date: "Oct., 2023",
        },
        {
          image: vishnupandal,
          heading:
            "भगवान विष्णु के 9 रूपों को देखना है तो कोकर के बांधगाड़ी पूजा पंडाल आइए",
            sections: [
              {
                title:
                  "भगवान विष्णु के 9 रूपों को देखना है तो कोकर के बांधगाड़ी पूजा पंडाल आइए",
                content:
                  "रांची : राजधानी रांची में दुर्गा पूजा की धूम है. कोकर के बांधगाड़ी में आकर्षक पूजा पंडाल बनाया गया है. इस बार तिरुपति बालाजी की प्रतिमा की तर्ज पर पंडाल का निर्माण किया गया है. इसमें क्षीर सागर में भगवान विष्णु को आराम करते दर्शाया गया है, वहीं विष्णु के नौ रूप का भी दर्शन होगा पंडाल के अंदर विष्णु के नौ रूपों का होगा दर्शन   बांधगाड़ी पूजा समिति के अध्यक्ष रमेश गोप ने कहा कि पंडाल के अंदर प्रवेश करने पर मुकुट धारण किए हुए चेहरे का स्वरूप दिखाई देगा. वहीं, श्री हरि विष्णु की स्तुति का धुन सुनाई देगा. कहा कि जैसे-जैसे अंदर प्रवेश करते जाएंगे चारों तरफ श्री सागर और स्वर्ण द्वार मिलेंगे जिसमें विष्णु के नौ रूपों को दिखाया गया है. कहा कि भगवान विष्णु के 10 रूप हैं, लेकिन एक रूप को कलयुग में आप कल्पना कर पाएंगे.   मां के दर्शन से पहले आप इन प्रारूप का करें दर्शनउन्होंने कहा कि समुद्र मंथन से लेकर कई तस्वीर और झांकियां आपको देखने को मिलेगी. इसके अलावा श्री हरि के हजारों शास्त्रों के अलग-अलग प्रारूप का आप अवलोकन कर पाएंगे. इसके बाद आप मां दुर्गा का दर्शन कर पाएंगे. कहा कि क्षीरसागर में विराजमान श्री हरि के अवलोकन करते हुए आप पंडाल से बाहर निकलेंगे.रमेश गोप ने कहा कि पंडाल निर्माण में करीब 30 लाख रुपये खर्च हुए हैं. पश्चिम बंगाल के कारीगर पिछले दो महीने से इस पंडाल को आकर्षक रूप देने में जुटे हैं. लाइटिंग की आकर्षक की गई है. लेजर के माध्यम से प्रस्तुति दिखाए जाएंगे",
              },
            ],
          id: 8,
          date: "Oct., 2023",
        },
        {
          image: bannagupta,
          heading:
            "डेंटल काउंसिल ऑफ झारखंड के कार्यों की जांच की मांग, यूथ कांग्रेस ने मंत्री बन्ना गुप्ता को सौंपा ज्ञापन",
            sections: [
              {
                title:
                  "डेंटल काउंसिल ऑफ झारखंड के कार्यों की जांच की मांग, यूथ कांग्रेस ने मंत्री बन्ना गुप्ता को सौंपा ज्ञापन",
                content:
                  "रांची : झारखंड प्रदेश यूथ कांग्रेस के प्रदेश अध्यक्ष इंदरजीत सिंह ने स्वास्थ्य मंत्री बन्ना गुप्ता को अवैध तरीके से संचालित हो रहे डेंटल काउंसिल ऑफ झारखंड की जांच कराने को लेकर ज्ञापन सौंपा है. यूथ कांग्रेस के प्रदेश अध्यक्ष ने सवाल उठाते हुए कहा कि आखिर किस आधार पर कमिटी गठित हुई. राज्य के कितने डेंटिस्ट ने वोट किया, कब चुनाव हुए और कब वोटिंग हुई. ये सभी जांच के विषय हैं. कहा कि सब लोग आपस में मिलकर दोबारा इस पद पर बने हुए हैं. नए लोगों को मौका तक नहीं दिया जाता.   जांच कर दोषियों पर कार्रवाई की मांग मंत्री को सौंपे ज्ञापन में उन्होंने आरोप लगाया कि डेंटिस्ट के रजिस्ट्रेशन के नाम पर हर साल 4000 रुपए की जगह 25 से 30 हजार रुपए लिए जाते हैं. उन्होंने डॉ सुशील कुमार एवं डॉ विशाल भगत पर भी गंभीर आरोप लगाएं. उन्होंने स्वास्थ्य मंत्री से आग्रह किया कि इस एसोसिएशन को जल्द रद्द करते हुए उसके खिलाफ जांच कर दोषियों के खिलाफ सख्त कार्रवाई की जाए.",
              },
            ],
          id: 9,
          date: "Oct., 2023",
        },
        {
          image: Policealert,
          heading:
            "रांची: दुर्गापूजा को लेकर पुलिस अलर्ट, उपद्रवियों से निपटने के लिए किया मॉक ड्रिल",
            sections: [
              {
                title:
                  "रांची: दुर्गापूजा को लेकर पुलिस अलर्ट, उपद्रवियों से निपटने के लिए किया मॉक ड्रिल",
                content:
                  "रांची: दुर्गापूजा को लेकर गुरुवार को कांके रोड स्थित पुलिस लाइन में मॉक ड्रिल का आयोजन हुआ. सिटी एसपी राजकुमार मेहता के निर्देश पर असामाजिक तत्वों से निपटने के लिए यह किया गया. सिटी एसपी ने कहा कि जिले में शांति-व्यवस्था बनाए रखने के लिए पुलिस पूरी तरह तैयार है. जिले में असामाजिक तत्वों द्वारा त्योहारों में माहौल को बिगाड़ने का प्रयास अगर किया गया तो ऐसे असामाजिक तत्वों से निपटने के लिए इस बार पुलिस ने पूरी तैयारी कर ली है. अश्रु गैस छोड़े और हवाई फायरिंग भी कि  इस दौरान पुलिस ने तथाकथित असामाजिक तत्वों के हुड़दंग को रोकने के लिए सबसे पहले उन्हें समझाने का प्रयास किया. उसके बाद हुड़दंग कर रहे लोगों पर पानी की बौछार कर अभ्यास को आगे बढ़ाया. पुलिस ने इस दौरान अश्रु गैस भी छोड़े और हवाई फायरिंग भी की. अंत में पुलिस ने हुड़दंग कर रहे लोगों पर लाठियां भी बरसाई, जिसके बाद हुड़दंग कर रहे असामाजिक तत्व वहां से भागे. सिटी एसपी राजकुमार मेहता ने बताया कि दुर्गापूजा शांतिपूर्वक तरीके से संपन्न हो, इसे लेकर पुलिस-प्रशासन पूरी तरह सजग है.सभी थाना क्षेत्रों के संवेदनशील इलाकों को चिह्नित कर वहां विशेष रूप से सुरक्षा दी गई है.",
              },
            ],
          id: 10,
          date: "Oct., 2023",
        },
        {
          image: transferorder,
          heading:
            "झारखंड प्रशासनिक सेवा के 20 अधिकारियों की ट्रांसफर-पोस्टिंग, जानें कौन कहां गये",
            sections: [
              {
                title:
                  "झारखंड प्रशासनिक सेवा के 20 अधिकारियों की ट्रांसफर-पोस्टिंग, जानें कौन कहां गये",
                content:
                  "रांची : झारखंड सरकार ने राज्य प्रशासनिक सेवा के 20 अधिकारियों की ट्रांसफर-पोस्टिंग की है. इसके तहत आठ अंचलाधिकारियों का तबादला किया गया है. इसके अलावा पदस्थापन की प्रतीक्षा में बैठे अधिकारियों की पोस्टिंग की गई है. इस संबंध में राजस्व, निबंधन एवं भूमि सुधार विभाग ने अधिसूचना जारी की है. जानें कौन कहां गये :  अधिकारी : कहां थे : कहां गये गोपी उरांव : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, गोड्डा बिमल सोरेन : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, राजमहल, साहेबगंज विजय केरकेट्टा : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, छतरपुर, पलामू   ओम प्रकाश मंडल : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, जामताड़ा दिप्ती प्रियंका कुजूर : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, रामगढ़  कुशलमय केनेथ मुंडू : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, चक्रधरपुर, पश्चिमी सिंहभूम प्रमेश कुशवाहा : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, रंका, गढ़वा  जीतराय मुर्मू : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, डुमरी, गिरिडीह विनोद प्रजापति : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, सिमरिया, चतरा  उदय कुमार : पदस्थापन की प्रतीक्षा में : भूमि सुधार उप समाहर्ता, लातेहार   प्रशांत कुमार लायक : अंचलाधिकारी, धनबाद सदर : भूमि सुधार उप समाहर्ता, देवघर  राजीव कुमार : अंचलाधिकारी, घाटशिला, पूर्वी सिंहभूम : भूमि सुधार उप समाहर्ता, पाकुड़ सुमंत तिर्की : अंचलाधिकारी, बेड़ो, रांची : भूमि सुधार उप समाहर्ता, कोडरमा  प्यारे लाल : अंचलाधिकारी, सोनाहातु, रांची : भूमि सुधार उप समाहर्ता, पलामू   रविश राज : अंचलाधिकारी, मनोहरपुर, पश्चिमी सिंहभूम : भूमि सुधार उप समाहर्ता, गढ़वासदानंद महतो : अंचलाधिकारी, धालभूमगढ़, पूर्वी सिंहभूम : भूमि सुधार उप समाहर्ता, गोड्डा सागरी बराल : अंचलाधिकारी, सोनुवा, पश्चिमी सिंहभूम : भूमि सुधार उप समाहर्ता, गुमला  अमर जॉन आईंद : अंचलाधिकारी, काठीकुंड, दुमका : भूमि सुधार उप समाहर्ता, हुसैनाबाद, पलामू  रवींद्र चौधरी : भूमि सुधार उप समाहर्ता, पाकुड़ : भूमि सुधार उप समाहर्ता, खोरी महुआ, गिरिडीह ",
              },
            ],
          id: 11,
          date: "Oct., 2023",
        },
      ],

      rightMenu: {
        header: "",

        heading:
          "Durga Puja  : चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
        content:
          "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
        place: "Kanhaiya Taleja",
        id: 2,
        date: "Oct 17, 2023",
      },
    },

    {
      bigNews: {
        image: Raghuadas,
        heading:
          "ओडिशा के राज्यपाल बनने पर रघुवर दास को मिल रही बधाई, मंत्री मिथिलेश ठाकुर ने कह दी ये बात",
        content:
          " रांची : झारखंड के पूर्व मुख्यमंत्री रघुवर दास के ओडिशा के राज्यपाल बनने पर बधाई देने का सिलसिला जारी है. बीजेपी प्रदेश अध्यक्ष समेत अन्य नेताओं ने शुभकामनाएं दी है. वहीं, झारखंड के मंत्री मिथिलेश ठाकुर ने बधाई देते गंभीर बातें कही है. कहा कि झारखंड बीजेपी में ओबीसी के सर्वमान्य नेता को राज्यपाल बनाने से उनका सक्रिय राजनीति का समापन हुआ है. कहा कि यह उन्नति या अवनति. समझ से परे है. दूसरी ओर, झारखंड बीजेपी प्रदेश अध्यक्ष बाबूलाल मरांडी ने रघुवर दास को बधाई देते हुए उनके अनुभवों का लाभ  ओडिशा की जनता को मिलने की बात कही. ओडिशा के राज्यपाल बनने पर रघुवर दास को बधाई देने वालों में पार्टी के प्रदेश संगठन महामंत्री नागेंद्र त्रिपाठी, प्रदेश संगठन महामंत्री कर्मवीर सिंह, प्रदेश महामंत्री एवं सांसद आदित्य साहू, डॉ प्रदीप वर्मा, बालमुकुंद सहाय सहित प्रदेश के नेतागण शामिल हैं. 	",
        author: "Kanhaiya Taleja",
        id: 12,
        date: "Oct 19, 2023",
      },

      smallNews: [
        {
          image: Raghuadas,
          heading:
            "ओडिशा के राज्यपाल बनने पर रघुवर दास को मिल रही बधाई, मंत्री मिथिलेश ठाकुर ने कह दी ये बात",
          id: 12,
          date: "Oct., 2023",
        },
        {
          image: footerimg3,
          heading: "रांची के हरमू मैदान में 28 अक्टूबर को बीजेपी की संकल्प ",
          id: 13,
          date: "Oct., 2023",
        },
        {
          image: footerimg2,
          heading: "साहेबगंज : खटिया पर ढोकर 12 किमी की दूरी तय कर मरीजों को",
          id: 14,
          date: "Oct., 2023",
        },
        {
          image: footerimg3,
          heading: "Jharkhand Breaking News Live: हजारीबाग के लौटवा डैम में ",
          id: 15,
          date: "Oct., 2023",
        },
        {
          image: footerimg2,
          heading: "सीएम हेमंत सोरेन ने 827 शिक्षकों को सौंपा नियुक्ति पत्र",
          id: 16,
          date: "Oct., 2023",
        },
        {
          image: footerimg3,
          heading: "बाबूलाल मरांडी का हेमंत सोरेन पर निशाना, पूर्व आईएएस विजय",
          id: 17,
          date: "Oct., 2023",
        },
        {
          image: footerimg2,
          heading: "Jharkhand Breaking News Live: सीएम हेमंत सोरेन ने 827",
          id: 18,
          date: "Oct., 2023",
        },
        {
          image: footerimg3,
          heading: "अमर कुमार बाउरी बने झारखंड बीजेपी विधायक दल के नेता, जेपी",
          id: 19,
          date: "Oct., 2023",
        },
        {
          image: footerimg2,
          heading: "बीजेपी की संकल्प यात्रा के समापन पर चर्चा, रांची में",
          id: 20,
          date: "Oct., 2023",
        },
        {
          image: footerimg3,
          heading: "विनिता घोष वतन वापस आई, इजरायल में युद्ध के बीच फंसी थी",
          id: 21,
          date: "Oct., 2023",
        },
      ],

      rightMenu: {
        header: "",
        source:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        heading:
          "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
        content:
          "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
        author: "Kanhaiya Taleja",
        id: 13,
        date: "Oct 17, 2023",
      },
    },
  ];

  let breakingNews =
    "राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न";

  const getDetailFun = (id, index) => {

    console.log("incoming data: ", data[index], index)
    const filteredNews = data[index]?.smallNews?.filter(item => item?.id == id);
    console.log("filteredNews: ", filteredNews);
  
    setPageData({
      bigNews: filteredNews[0],
      smallNews: data[index]?.smallNews,
      rightMenu: data[index]?.rightMenu
    });
       setPageToggle(true);

    return;
    console.log(id);
    axios.post(apiGetNewsById, { id: id }, ApiJsonHeader).then((res) => {
      console.log("Page response => ", res);
      if (res?.data?.status) {
        setPageData(res?.data?.data);
        setPageToggle(true);
      }
    });
  };

  return (
    <>
      <div className='fixed top-0 bg-white z-50'>
        <BrandingIndex wpx={wpx} menu={brandingMenu} />
        <div className='h-[1.7rem]'></div>
        <NewsCategoriesIndex wpx={wpx} menu={newsCategoriesMenu} />
      </div>

      <div className='mt-[140px]'>
        {bClose && <BreakingNewsIndex wpx={wpx} bnews={breakingNews} bClose={(status) => setBClose(status)} />}
      {
        !pageToggle && data?.map((elem, index) => <>
          <HomeLayout key={index} index={index} data={elem} wpx={wpx} getFun={(id, index) => getDetailFun(id, index)} />
        </>)
      }

      {pageToggle && (
        <ContentIndex
          data={pageData}
          wpx={wpx}
          getBack={() => setPageToggle(false)}
        />
      )}

      <Footerlayout />
      </div>

    </>
  )
}

export default HomeIndex;

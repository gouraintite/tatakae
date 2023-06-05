import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANS_FR } from "./fr/transFr";
import { TRANS_EN } from "./en/transEn";
 
i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     En: {
       translation: TRANS_EN
     },
     Fr: {
       translation: TRANS_FR
     }
   }
 });
 
 let Lang = String(localStorage.getItem("lang"))
 i18n.changeLanguage(Lang);
 
export default i18n;
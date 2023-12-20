"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.getTextStringFromHtml = void 0;
const getTextStringFromHtml = (html, wordCount = 20) => {
    // Remove HTML tags
    const regex = /<[^>]*>/g;
    const plainText = html.replace(regex, '');
    // Split text into words and calculate sentence length
    const words = plainText.split(/\s+/);
    // const sentenceLength = Math.ceil(words.length / 20) * 20;
    // Return first 20 words or sentence length, whichever is less
    const truncatedText = words.slice(0, wordCount).join(' ');
    return truncatedText;
};
exports.getTextStringFromHtml = getTextStringFromHtml;
const formatDate = (date, locale = 'en-us') => {
    return Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(Date.parse(date));
};
exports.formatDate = formatDate;

import shSVG from '../assets/svgs/sh.svg';
import dbSVG from '../assets/svgs/db.svg';
import tsSVG from '../assets/svgs/ts.svg';
import jsSVG from '../assets/svgs/js.svg';
import mdSVG from '../assets/svgs/md.svg';
import zipSVG from '../assets/svgs/zip.svg';
import pdfSVG from '../assets/svgs/pdf.svg';
import phpSVG from '../assets/svgs/php.svg';
import imgSVG from '../assets/svgs/img.svg';
import svgSVG from '../assets/svgs/svg.svg';
import xmlSVG from '../assets/svgs/xml.svg';
import cssSVG from '../assets/svgs/css.svg';
import icoSVG from '../assets/svgs/star.svg';
import htmlSVG from '../assets/svgs/html.svg';
import jsonSVG from '../assets/svgs/json.svg';
import javaSVG from '../assets/svgs/java.svg';
import bookSVG from '../assets/svgs/book.svg';
import wordSVG from '../assets/svgs/word.svg';
import fontSVG from '../assets/svgs/font.svg';
import fileSVG from '../assets/svgs/file.svg';
import excelSVG from '../assets/svgs/excel.svg';
import audioSVG from '../assets/svgs/audio.svg';
import videoSVG from '../assets/svgs/video.svg';
import reactSVG from '../assets/svgs/react.svg';
import appleSVG from '../assets/svgs/apple.svg';
import jsonldSVG from '../assets/svgs/jsonld.svg';
import binarySVG from '../assets/svgs/binary.svg';
import pythonSVG from '../assets/svgs/python.svg';
import powerpointSVG from '../assets/svgs/powerpoint.svg';

const svgIcons = {
  ".db": dbSVG,
  ".ts": tsSVG,
  ".jsx": reactSVG,
  ".tsx": reactSVG,

  "text/xml": xmlSVG,
  "text/css": cssSVG,
  "text/html": htmlSVG,
  "text/x-log": fileSVG,
  "text/x-python": pythonSVG,
  "text/markdown": mdSVG,

  "audio/aac": audioSVG,
  "audio/ogg": audioSVG,
  "audio/wav": audioSVG,
  "audio/webm": audioSVG,
  "audio/opus": audioSVG,
  "audio/midi": audioSVG,
  "audio/3gpp": audioSVG,
  "audio/3gpp2": audioSVG,
  "audio/x-midi": audioSVG,
  "audio/mpeg": audioSVG,

  "image/png": imgSVG,
  "image/bmp": imgSVG,
  "image/gif": imgSVG,
  "image/jpeg": imgSVG,
  "image/webp": imgSVG,
  "image/avif": imgSVG,
  "image/tiff": imgSVG,
  "image/x-icon": icoSVG,
  "image/svg+xml": svgSVG,
  "image/vnd.microsoft.icon": imgSVG,

  "video/ogg": videoSVG,
  "video/mp4": videoSVG,
  "video/webm": videoSVG,
  "video/3gpp": videoSVG,
  "video/mp2t": videoSVG,
  "video/mpeg": videoSVG,
  "video/x-msvideo": videoSVG,

  "application/zip": zipSVG,
  "application/xml": xmlSVG,
  "application/rtf": wordSVG,
  "application/pdf": pdfSVG,
  "application/ogg": fileSVG,
  "application/x-sh": shSVG,
  "application/json": jsonSVG,
  "application/gzip": zipSVG,
  "application/x-cdf": audioSVG,
  "application/x-csh": shSVG,
  "application/x-tar": zipSVG,
  "application/x-bzip": zipSVG,
  "application/msword": wordSVG,
  "application/x-bzip2": zipSVG,
  "application/vnd.rar": zipSVG,
  "application/ld+json": jsonldSVG,
  "application/atom+xml": xmlSVG,
  "application/epub+zip": bookSVG,
  "application/vnd.visio": fileSVG,
  "application/xhtml+xml": htmlSVG,
  "application/x-httpd-php": phpSVG,
  "application/vnd.sqlite3": dbSVG,
  "application/vnd.ms-excel": excelSVG,
  "application/x-javascript": jsSVG,
  "application/octet-stream": binarySVG,
  "application/java-archive": javaSVG,
  "application/x-7z-compressed": zipSVG,
  "application/vnd.amazon.ebook": bookSVG,
  "application/vnd.ms-fontobject": fontSVG,
  "application/vnd.ms-powerpoint": powerpointSVG,
  "application/vnd.mozilla.xul+xml": fileSVG,
  "application/vnd.apple.installer+xml": appleSVG,
  "application/vnd.oasis.opendocument.text": fileSVG,
  "application/vnd.oasis.opendocument.spreadsheet": excelSVG,
  "application/vnd.oasis.opendocument.presentation": powerpointSVG,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": excelSVG,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": wordSVG,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": powerpointSVG,
};

const fileIcon = (name:string|undefined, mimeType:string|undefined) => {
  const fileExtRegex = /(?:\.([^.]+))?$/;
  const svgMimeTypeIcon = svgIcons[`${mimeType}`];
  const svgFileTypeIcon = name.includes('.') ? svgIcons[`.${fileExtRegex.exec(name)[1]}`] : undefined;
  const icon = svgMimeTypeIcon || svgFileTypeIcon || fileSVG;
  return icon;
};

export default fileIcon;

import { captureRef } from 'react-native-view-shot';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

export const generateJPG = async (viewRef: any) => {
  try {
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 1,
      result: 'tmpfile'
    });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }
    return uri;
  } catch (error) {
    console.error('Error generating JPG:', error);
    throw error;
  }
};

export const generatePDF = async (viewRef: any) => {
  try {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
      result: 'data-uri'
    });

    const html = `
      <html>
        <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;">
          <img src="${uri}" style="width: 100%; height: auto;" />
        </body>
      </html>
    `;

    const { uri: pdfUri } = await Print.printToFileAsync({ html });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfUri);
    }
    return pdfUri;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

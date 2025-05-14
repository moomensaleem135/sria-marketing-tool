import { downloadAwsFile } from '@/services/app/downloadFiles';
import { IS3FileLink } from '@/store/app/types';
import { toast } from 'react-toastify';

export const handleDownloadFile = async (file: IS3FileLink | undefined) => {
  try {
    if (file) {
      const fileExtension = file?.file_name?.split('.').pop()?.toLowerCase();
      if (fileExtension === 'doc' || fileExtension === 'docx') {
        window.location.href = file?.download_link ? file?.download_link : '';
      } else {
        const resp = await downloadAwsFile(file?.preview_link);
        if (resp) {
          window.location.href = resp.download_link;
        }
      }
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};

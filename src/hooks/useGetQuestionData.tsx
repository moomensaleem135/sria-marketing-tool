import { GetQuestionsService } from '@/services/app';
import { Question } from '@/store/app/types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useQuestionData = (tabName: string) => {
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await GetQuestionsService(tabName);
      if (resp) {
        setData(resp.data.questions);
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tabName]);

  return { data, loading };
};
export default useQuestionData;

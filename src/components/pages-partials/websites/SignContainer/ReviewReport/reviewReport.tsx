import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginVertical: 10,
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginLeft: 15,
    marginVertical: 5,
  },
  subQuestions: {
    marginLeft: 15,
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
  },
  userDataBox: {
    marginTop: 15,
  },
  reportRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  signatureCanvas: {
    width: 150,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
});

interface IReviewReportPDFProps {
  answers: any[];
  questions: any[];
  fieldData: any[];
  formikValues: any;
  signatureText: string;
  ccoName: string;
}

const ReviewReportPDF = ({
  answers,
  questions,
  fieldData,
  formikValues,
  signatureText,
  ccoName,
}: IReviewReportPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.flexCol}>
          <Text style={styles.title}>Marketing Review Report</Text>
          
          <View>
            {fieldData.map((field) => (
              <View key={field.id}>
                {field.type !== 'upload' && formikValues?.[field.name] && (
                  <View style={styles.fieldRow}>
                    <Text style={styles.boldText}>{field.fieldTitle}: </Text>
                    <Text>{formikValues?.[field.name] || 'Not provided'}</Text>
                  </View>
                )}
              </View>
            ))}
            <View style={styles.line} />
          </View>

          {questions.map((question) => {
            const answer = answers.find((a) => a.id === question.id);

            return (
              <View key={question.id} style={styles.questionContainer}>
                {/* Main Question */}
                <View style={styles.questionRow}>
                  <Text style={styles.boldText}>{question.display_order}.</Text>
                  <Text>{question.html_question_text.replace(/<[^>]*>/g, '')}</Text>
                </View>
                
                <View style={styles.checkboxGroup}>
                  <Text>Yes: [{answer?.mainAnswer === 'Yes' ? 'X' : ' '}]</Text>
                  <Text>No: [{answer?.mainAnswer === 'No' ? 'X' : ' '}]</Text>
                </View>

                {/* Sub Questions */}
                {question.subquestions && answer?.subAnswers && answer.mainAnswer === question.show_subquestions && (
                  <View style={styles.subQuestions}>
                    {question.subquestions.map((subQ, subIndex) => (
                      <View key={subIndex} style={{ marginBottom: 5 }}>
                        <Text style={styles.boldText}>{subQ.text}</Text>
                        {subQ.field_type === 'checkbox' ? (
                          <View style={styles.checkboxGroup}>
                            <Text>Yes: [{answer?.subAnswers?.[`sub_${subIndex}`] === 'Yes' ? 'X' : ' '}]</Text>
                            <Text>No: [{answer?.subAnswers?.[`sub_${subIndex}`] === 'No' ? 'X' : ' '}]</Text>
                          </View>
                        ) : subQ.field_type === 'radio' ? (
                          <Text>[X]</Text>
                        ) : (
                          <Text>{(answer?.subAnswers && answer?.subAnswers[`sub_${subIndex}`]) || ''}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
          
          <View style={styles.line} />

          <View style={styles.footer}>
            <Text style={{ marginBottom: 15 }}>
              I have reviewed the attached marketing piece and answered all questions for the review
              truthfully and to the best of my knowledge.
            </Text>
            
            <View style={styles.userDataBox}>
              <View style={styles.reportRow}>
                <Text style={[styles.boldText, { width: 60 }]}>CCO Name:</Text>
                <Text>{ccoName}</Text>
              </View>
              
              <View style={styles.reportRow}>
                <Text style={[styles.boldText, { width: 60 }]}>Date:</Text>
                <Text>{moment().format('MM-DD-YYYY')}</Text>
              </View>
              
              <View style={styles.reportRow}>
                <Text style={[styles.boldText, { width: 60 }]}>Signature:</Text>
                {signatureText && (
                  <View style={styles.signatureCanvas}>
                    <Text style={{ fontFamily: 'Helvetica-Oblique' }}>{signatureText}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReviewReportPDF;
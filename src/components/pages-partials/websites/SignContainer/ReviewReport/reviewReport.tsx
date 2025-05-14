import { COLORS } from '@/constants/colors';
import { Answer, Question } from '@/store/app/types';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  boldText: {
    fontWeight: 'bold'
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginVertical: 10
  },
  questionContainer: {
    marginBottom: 10
  },
  questionRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2
  },
  checkboxGroupMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginLeft: 15
    // marginVertical: 5
  },
  checkboxGroupSub: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15
    // marginVertical: 5
  },
  subQuestions: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10
  },
  footer: {
    marginTop: 20
  },
  userDataBox: {
    marginTop: 15
  },
  reportRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center'
  },
  signatureCanvas: {
    width: 120,
    height: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
    // marginBottom: 5
  },
  radioFlexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
    // rowGap: 10
  },
  checkedBox: {
    height: 9,
    width: 9,
    backgroundColor: COLORS.BLUE_600,
    border: `1px solid ${COLORS.BLUE_600}`
  },
  selecteText: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    marginTop: 5
  },
  box: {
    height: 9,
    width: 9,

    border: `1px solid ${COLORS.BLUE_600}`
  },
  radioBtnChecked: {
    height: 10,
    width: 10,
    borderRadius: '50%',
    backgroundColor: COLORS.BLUE_600,
    border: `1px solid ${COLORS.BLUE_600}`
  }
});

interface IReviewReportPDFProps {
  answers: Answer[];
  questions: Question[];
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
  ccoName
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

                <View style={styles.checkboxGroupMain}>
                  <View style={styles.radioFlexBox}>
                    {answer?.mainAnswer === 'Yes' ? (
                      <View style={styles.checkedBox}></View>
                    ) : (
                      <View style={styles.box}></View>
                    )}

                    <Text style={styles.selecteText}>Yes</Text>
                  </View>
                  <View style={styles.radioFlexBox}>
                    {answer?.mainAnswer === 'No' ? (
                      <View style={styles.checkedBox}></View>
                    ) : (
                      <View style={styles.box}></View>
                    )}

                    <Text style={styles.selecteText}>No</Text>
                  </View>
                </View>

                {/* Sub Questions */}
                {question.subquestions &&
                  answer?.mainAnswer &&
                  answer.mainAnswer.toLowerCase() === question.show_subquestions && (
                    <View style={styles.subQuestions}>
                      {question.subquestions
                        .filter((subQuestion) => subQuestion.field_type !== 'file')
                        .map((subQ, subIndex) => (
                          <View
                            key={subIndex}
                            style={{
                              marginBottom: 2,
                              display: subQ.field_type === 'radio' ? 'flex' : undefined,
                              flexDirection:
                                subQ.field_type === 'radio' ? 'row-reverse' : undefined,
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Text style={styles.boldText}>
                              {subQ.html_sub_question_text.replace(/<[^>]*>/g, '')}
                            </Text>
                            {subQ.field_type === 'checkbox' ? (
                              <View style={styles.checkboxGroupSub}>
                                <View style={styles.radioFlexBox}>
                                  {answer?.subAnswers?.[`sub_${subQ.id}`] === 'Yes' ? (
                                    <View style={styles.checkedBox}></View>
                                  ) : (
                                    <View style={styles.box}></View>
                                  )}

                                  <Text style={styles.selecteText}>Yes</Text>
                                </View>
                                <View style={styles.radioFlexBox}>
                                  {answer?.subAnswers?.[`sub_${subQ.id}`] === 'No' ? (
                                    <View style={styles.checkedBox}></View>
                                  ) : (
                                    <View style={styles.box}></View>
                                  )}

                                  <Text style={styles.selecteText}>No</Text>
                                </View>
                                {subQ.is_na && subQ.question_type !== 'spacial' && (
                                  <View style={styles.radioFlexBox}>
                                    {answer?.subAnswers?.[`sub_${subQ.id}`] === 'N/A' ? (
                                      <View style={styles.checkedBox}></View>
                                    ) : (
                                      <View style={styles.box}></View>
                                    )}

                                    <Text style={styles.selecteText}>N/A</Text>
                                  </View>
                                )}
                              </View>
                            ) : subQ.field_type === 'radio' ? (
                              answer?.subAnswers?.[`sub_${subQ.id}`] === 'on' ? (
                                <View style={styles.checkedBox}></View>
                              ) : (
                                <View style={styles.box}></View>
                              )
                            ) : (
                              <Text>
                                {(answer?.subAnswers && answer?.subAnswers[`sub_${subQ.id}`]) || ''}
                              </Text>
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
                <Text style={[styles.boldText, { width: 80 }]}>CCO Name:</Text>
                <Text>{ccoName}</Text>
              </View>

              <View style={styles.reportRow}>
                <Text style={[styles.boldText, { width: 80 }]}>Date:</Text>
                <Text>{moment().format('MM-DD-YYYY')}</Text>
              </View>

              <View style={styles.reportRow}>
                <Text style={[styles.boldText, { width: 80 }]}>Signature:</Text>
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

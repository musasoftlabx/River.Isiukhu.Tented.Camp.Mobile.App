// * React
import {memo} from 'react';

// * React Native imports
import {Alert, useWindowDimensions, View} from 'react-native';

// * React Native Libraries
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {RFPercentage as s} from 'react-native-responsive-fontsize';

// * JS Libraries
import {Formik} from 'formik';
import {Motion} from '@legendapp/motion';
import {useMutation} from '@tanstack/react-query';
import * as Yup from 'yup';

// * Utilities
import {styles} from '../../styles';
import ButtonX from '../../components/ButtonX';

const Add = () => {
  const theme = useTheme();
  const primary = theme.colors.primary;

  return (
    <Formik
      initialValues={{item: '', opening: '', closing: ''}}
      validationSchema={Yup.object({
        item: Yup.string().max(50, 'Max of 50 chars').required('Required'),
        opening: Yup.number()
          .test(
            'len',
            'Max of 3 chars',
            (v: any) => v && v.toString().length <= 3,
          )
          .required('Required'),
        closing: Yup.number().test(
          'len',
          'Max of 3 chars',
          (v: any) => v && v.toString().length <= 3,
        ),
      })}
      onSubmit={(values, {setSubmitting}) => {
        Alert.alert('sub', JSON.stringify(values), [{text: 'OK'}]);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}>
          <TextInput
            label="Item *"
            onChangeText={handleChange('item')}
            onBlur={handleBlur('item')}
            placeholder="Select item"
            style={styles.textInput}
            theme={{roundness: 0}}
            value={values.item}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.46}}>
              <TextInput
                label="Opening *"
                onChangeText={handleChange('opening')}
                onBlur={handleBlur('opening')}
                placeholder="amount"
                keyboardType="numeric"
                maxLength={3}
                style={styles.textInput}
                theme={{roundness: 0}}
                value={values.opening}
              />
            </View>

            <View style={{flex: 0.46}}>
              <TextInput
                label="Closing (Opt.)"
                onChangeText={handleChange('closing')}
                onBlur={handleBlur('closing')}
                placeholder="amount"
                keyboardType="numeric"
                maxLength={3}
                style={styles.textInput}
                theme={{roundness: 0}}
                value={values.closing}
              />
            </View>
          </View>

          <View
            style={{
              backgroundColor:
                JSON.stringify(touched) === '{}' ||
                JSON.stringify(errors) !== '{}' ||
                isSubmitting
                  ? 'transparent'
                  : primary,
              borderRadius: 40,
              marginHorizontal: 50,
            }}>
            <ButtonX
              errors={errors}
              isSubmitting={isSubmitting}
              touched={touched}
              values={values}
              onPress={() => handleSubmit()}
              style={{width: 150}}>
              ADD
            </ButtonX>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default memo(Add);

// * React Native
import {Alert, Image, Pressable, View} from 'react-native';

// * React Native Libraries
import {AnimatePresence, Motion} from '@legendapp/motion';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  Button,
  FAB,
  Switch,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select'; //@react-native-picker/picker
import {RFPercentage as s} from 'react-native-responsive-fontsize';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import MaskInput, {createNumberMask} from 'react-native-mask-input';
import Icons from 'react-native-vector-icons/Ionicons';

// * JS Libraries
import {Formik} from 'formik';
import {useMutation, useQuery} from '@tanstack/react-query';
import * as Yup from 'yup';

// * Components
import ButtonX from '../../components/ButtonX';

// * Utilities
import {useConfigStore} from '../../store';
import {styles} from '../../styles';

export default function Add({navigation}: {navigation: any}) {
  // ? useStore
  const axios = useConfigStore(state => state.axios);

  const {mutate} = useMutation(data =>
    axios({
      method: 'POST',
      url: 'staff',
      data,
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
    }),
  );

  const {data: roles, isFetched} = useQuery(
    ['roles'],
    ({queryKey}) => axios.get(queryKey[0]),
    {select: data => data.data},
  );

  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          salary: '',
          role: '',
          permanent: false,
          image: {uri: '', type: ''},
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(20, 'Max of {max} chars')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Max of {max} chars')
            .required('Required'),
          emailAddress: Yup.string().email().max(50, 'Max of {max} chars'),
          phoneNumber: Yup.string()
            .min(10, 'Min of {min} chars')
            .required('Required'),
          salary: Yup.string(),
          role: Yup.string().required('Required'),
          permanent: Yup.boolean(),
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          let formData = new FormData();
          values.image.uri &&
            formData.append('image', {
              name: `photo.${values.image.type.split('/')[1]}`,
              uri: values.image.uri,
              type: values.image.type,
            });
          formData.append('firstName', values.firstName);
          formData.append('lastName', values.lastName);
          formData.append('emailAddress', values.emailAddress);
          formData.append('phoneNumber', values.phoneNumber);
          formData.append('salary', values.salary);
          formData.append('role', values.role);
          formData.append('permanent', values.permanent);

          //@ts-ignore
          mutate(formData, {
            onSuccess: () => {
              resetForm();
              navigation.navigate('Staff');
            },
            onError: (error: any) => {
              Alert.alert(
                error.response.data.subject,
                error.response.data.body,
                [{text: 'OK'}],
              );
            },
          });
          setSubmitting(false);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
        }) => (
          <View style={{padding: 20}}>
            <TextInput
              label="First Name *"
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
              placeholder="Enter First Name"
              style={styles.textInput}
              value={values.firstName}
            />

            <TextInput
              label="Last Name *"
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
              placeholder="Enter Last Name"
              style={styles.textInput}
              value={values.lastName}
            />

            <TextInput
              label="Email Address (Optional)"
              keyboardType="email-address"
              onBlur={handleBlur('emailAddress')}
              onChangeText={handleChange('emailAddress')}
              placeholder="Enter Email Address"
              style={styles.textInput}
              value={values.emailAddress}
            />

            <TextInput
              label="Phone Number *"
              keyboardType="number-pad"
              onBlur={handleBlur('phoneNumber')}
              onChangeText={handleChange('phoneNumber')}
              placeholder="Enter Phone Number"
              style={styles.textInput}
              value={values.phoneNumber}
              render={props => (
                <MaskInput
                  {...props}
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />
              )}
            />

            <TextInput
              label="Salary (Optional)"
              keyboardType="number-pad"
              onBlur={handleBlur('salary')}
              //onChangeText={handleChange('salary')}
              placeholder="Enter Salary"
              style={styles.textInput}
              value={values.salary}
              render={props => (
                <MaskInput
                  {...props}
                  mask={createNumberMask({
                    prefix: ['Kes', ' '],
                    delimiter: ',',
                    separator: '.',
                    precision: 0,
                  })}
                  onChangeText={(masked, unmasked) =>
                    setFieldValue('salary', unmasked)
                  }
                  //const clean = masked.split('.')[0].replace(/Kes |,/g, '');
                />
              )}
            />

            <View
              style={{
                backgroundColor: 'rgba(232, 222, 248, .4)',
                borderRadius: 8,
                borderWidth: 0.5,
                marginBottom: 20,
                paddingVertical: 1,
                paddingBottom: values.role ? 3 : 10,
              }}>
              {values.role ? (
                <Text
                  style={{
                    fontSize: s(1.8),
                    marginTop: 8,
                    marginBottom: -18,
                    marginLeft: 15,
                  }}>
                  Role
                </Text>
              ) : null}
              <RNPickerSelect
                items={
                  isFetched
                    ? roles.map(({_id, role}: {_id: string; role: string}) => ({
                        key: _id,
                        label: role,
                        value: role,
                      }))
                    : []
                }
                value={values.role}
                onValueChange={value => setFieldValue('role', value)}
                placeholder={{
                  label: 'Select role *',
                  value: null,
                  color: 'grey',
                  fontSize: s(2.1),
                }}
                fixAndroidTouchableBug={true}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: {
                    color: '#424242',
                    fontFamily: 'Laila',
                    fontSize: s(2.1),
                    padding: 15,
                    paddingBottom: 3,
                    paddingRight: 30,
                  },
                  inputAndroid: {
                    color: '#757575',
                    fontFamily: 'Laila',
                    fontSize: s(3.1),
                    padding: 14,
                    paddingBottom: 3,
                    paddingRight: 30,
                  },
                  iconContainer: {top: 15, right: 15},
                  placeholder: {color: '#616161'},
                }}
                //@ts-ignore
                Icon={() => (
                  <Icons name="chevron-down-sharp" size={24} color="#9e9e9e" />
                )}
              />
            </View>

            <View style={{alignItems: 'flex-start', marginBottom: 10}}>
              <Text style={{fontSize: s(2.1), opacity: 0.6}}>
                Is this staff member permanent?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: -2,
                  marginTop: 8,
                }}>
                <Switch
                  value={values.permanent}
                  onValueChange={() =>
                    setFieldValue('permanent', !values.permanent)
                  }
                  style={{marginRight: 5}}
                />
                <Text style={{fontSize: s(2.3)}}>
                  {values.permanent ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderStyle: 'dashed',
                borderWidth: 1,
                height: 110,
                marginBottom: 40,
                padding: 5,
                width: 110,
              }}>
              {values.image.uri && (
                <Image
                  source={{uri: values.image.uri}}
                  style={{borderRadius: 10, height: 100, width: 100, zIndex: 1}}
                />
              )}
              <View style={{alignItems: 'center', position: 'absolute'}}>
                <Text style={{fontSize: s(2.2)}}>Upload photo</Text>
                <Text style={{fontSize: s(1.3)}}>Click on the plus icon</Text>
              </View>
              <FAB
                icon="camera"
                customSize={36}
                style={{
                  bottom: -15,
                  position: 'absolute',
                  left: -15,
                  zIndex: 2,
                }}
                onPress={() =>
                  launchCamera(
                    {mediaType: 'photo'},
                    ({assets}) => assets && setFieldValue('image', assets?.[0]),
                  )
                }
              />
              <FAB
                icon="folder-image"
                customSize={36}
                style={{
                  bottom: -15,
                  position: 'absolute',
                  left: 35,
                  zIndex: 2,
                }}
                onPress={() =>
                  launchImageLibrary(
                    {mediaType: 'photo'},
                    ({assets}) => console.log(assets),
                    //({assets}) => assets && setFieldValue('image', assets?.[0]),
                  )
                }
              />
              <FAB
                icon="delete"
                color="red"
                customSize={36}
                style={{
                  bottom: -15,
                  position: 'absolute',
                  right: -15,
                  zIndex: 2,
                }}
                onPress={() =>
                  resetForm({values: {...values, image: {uri: '', type: ''}}})
                }
              />
            </View>

            <ButtonX
              attributes={{
                errors,
                isSubmitting,
                label: 'ADD USER',
                touched,
                values,
              }}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

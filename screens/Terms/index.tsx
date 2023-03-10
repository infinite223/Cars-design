import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './../../slices/themeSlice';
import { Icon } from '@rneui/base';
import { style } from './style';
import { translations } from './../../utils/translations';
import { selectLanguage } from './../../slices/languageSlice';

const TermsScreen = () => {
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)
    const { headerText } = translations.screens.Terms
    const language = useSelector(selectLanguage)
    
    useLayoutEffect(() => {
        navigation.setOptions({
           headerBackVisible:false,
           headerTitle: () => <Text style={{ fontSize:21, color:theme.fontColor}}>
            {headerText[language as keyof typeof headerText]}
           </Text>,
           headerLeft: () => (
               <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal:10}}>
                    <Icon type="materialicon" name={'arrow-back-ios'} size={24} color={theme.fontColor}/>
                </TouchableOpacity> 
          ),
        })  
      }, [theme])

  return (
    <View>
        <ScrollView>
        <View style={style.container}>
            <Text style={style.headerText}>Regulamin aplikacji
             <Text style={{fontWeight:'bold'}}> Cars project</Text>
             </Text>

                <Text style={{marginBottom:10}}>
                    Poniższy regulamin reguluje zasady korzystania z aplikacji poprzez użytkownika, każdy z nich musi go zaakceptować aby móc używać aplikacji. 
                </Text>
                  <Text style={{marginBottom:5, fontSize:18}}>Serwis oferuje: </Text>

                <Text>•	Oferuje możliwość udostępniania treści, nawiązywania kontaktów, komunikacji</Text>
                <Text>•	Tworzenie, dołączanie do spotkań </Text>
                <Text>•	Reklamowanie swoich działalności</Text>
                <Text> Sposób finansowania</Text>
                <Text> Korzystanie z aplikacji jest całkowicie bezpłatne.</Text>
                <Text style={{marginVertical:5, fontSize:18}}>
                Zobowiązania użytkownika :
                </Text>
                <Text>Kto może korzystać z aplikacji?</Text>
                <Text>•	Użytkownik musi mieć ukończone 13 lat.</Text>
                <Text>•	Użytkownik nie może mieć w przeszłości zablokowanego konta z powodu naruszenia naszych zasad.</Text>
                <Text style={{marginVertical:5, fontSize:18}}>
                Pozwolenia udzielane przez użytkownika:
                </Text>
                <Text>W ramach naszej umowy użytkownik udziela pozwolenia wymaganych do korzystania z aplikacji     </Text>
                <Text>•	Pozwolenia na wykorzystanie danych takich jak nazwa użytkownika, zdjęcie profilowe i inne dane umieszczone w aplikacji. Dane są wykorzystywane do działania serwisu Cars project, funkcjonalności takie jak np. wyszukiwanie użytkowników.    </Text>
                <Text>•	Użytkownik wyraża pozwolenie na instalowanie aktualizacji na jego urządzeniu.    </Text>
                <Text>•	Użytkownik udostępniając jakiekolwiek treści w aplikacji zgadza się na dostępność tych danych dla każdego innego użytkownika.    </Text>
                <Text style={{marginVertical:5, fontSize:18}}>
                Co jest zabronione w aplikacji?
                </Text>
                <Text>•	Podszywanie się pod inną osobę.</Text>
                <Text>•	Nie można udostępniać informacji nie na temat, zdjęcia muszą przedstawiać kontekst motoryzacyjny, podawane informacje o „projekcie” muszą być prawdziwe.</Text>
                <Text>•	Nie można postępować nie zgodnie z prawem .</Text>
                <Text>•	Nie można publikować prywatnych bądź poufnych danych innej osoby bez jej zgody.</Text>
           
                <Text style={{marginVertical:5, fontSize:18}}>Aktualizacje regulaminu</Text>
                    <Text>Twórca ma prawo do aktualizacji regulaminu, jednak każdy użytkownik będzie o tym poinformowany z minimum tygodniowym wyprzedzeniem. Będzie miał on możliwość z wcześniejszym zapoznaniem się z nowym regulaminem i jego akceptacją bądź zrezygnowaniem z usługi jaką jest korzystanie z aplikacji. </Text>
                <Text style={{marginVertical:5, fontSize:18}}>W jaki sposób zrezygnować z regulaminu?</Text>
                    <Text>Użytkownik ma prawo w każdej chwili odstąpić od umowy, regulaminu poprzez usunięcie konta. Wszystkie dane użytkownika są usuwane z bazy i nie będą one już w żaden sposób wykorzystywane.</Text>
                <Text style={{marginVertical:5, fontSize:18}}>Kto jest właścicielem serwisu?</Text>
                <Text>Dawid Szmigiel </Text>
         
        </View>
      </ScrollView>
    </View>
  )
}

export default TermsScreen
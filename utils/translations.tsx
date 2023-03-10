export const translations = {
    navigation: {
        rightNavigation: {
            links: {
                profile: {
                    en: 'My profile',
                    pl: 'Mój profil'
                },
                group: {
                    en: "Groups",
                    pl: 'Grupy'
                },
                add: {
                    en: 'Add project',
                    pl: 'Dodaj projekt'
                },
                chats: {
                    en: 'Chats',
                    pl:'Czaty'
                },
                settings: {
                    en:'Settings',
                    pl: 'Ustawienia'
                },
                reviews: {
                    en: 'Add reviews',
                    pl: 'Dodaj opinie'
                }
            },
            logoutText: {
                en:'Logout',
                pl:'Wyloguj'
            }
        }  
    },
    components: {
        BottomOptions: {
            editText: {
                en: 'Edit project',
                pl: 'Edytuj projekt'
            },
            deleteText: {
                en: 'Delete project',
                pl: "Usuń projekt"
            },
            hideText: {
                en: 'Hide project',
                pl: 'Ukryj projekt'
            },
            reportText: {
                en: 'Report project',
                pl: 'Zgłoś projekt' 
            },
            shareText: {
                en: 'Share project',
                pl: 'Udostępnij projekt'
            }
        },
        carProject: {
            _menuOptions: {
                report: {
                    en: 'Report project',
                    pl: 'Zgłoś projekt'
                },
                save: {
                    en: 'Save offline',
                    pl: 'Zapisz offline'
                },
                capy: {
                    en: 'Copy link',
                    pl: 'Kopiuj link'
                },
                hide: {
                    en: 'Hide project',
                    pl: 'Ukryj projekt'
                }
            },
            likesText: {
                en:'likes',
                pl:'polubień'
            }
        },
        Form: {
            errorText: {
                en:"Something was wrong",
                pl:"Coś poszło nie tak"
            },
            errorPassText: {
                en: "Passwords are different",
                pl: "Hasła są różne"
            },
            placeholder: {
                emailText: {
                    en: "Your email",
                    pl: "Twój email"
                },
                passText: {
                    en: "Twoje hasło",
                    pl: "Your password"
                },
                repeatPassText: {
                    en: "Repeat password",
                    pl: "Powtórz hasło"
                }
            } 
        }
    },
    screens: {
        modals: {
            settingsModals: {
                informationModal: {
                    headerText: {
                        en: "About application",
                        pl: "Czym jest Cars project?",
                    },
                    title: {
                        en: "Information",
                        pl: "Informacje",                       
                    },
                    about: {
                        en: "The application is designed to connect the automotive community so that every user who has created his car project somewhere can boast about it here, inspire others."+
                            " Udostępnić najciekawsze zdjęcia, najważniejsze parametry samochodu jak i historię modyfikacji."+
                            " Share the most interesting photos, the most important parameters of the car as well as the history of modifications."
                        ,
                        pl: "Aplikacja ma za zadanie łączyć motoryzacyjną społeczność tak aby każdy użytkownik który stworzył gdzieś swój projekt samochodu mógł się nim tutaj pochwalić, zainspirować innych."+
                            " Udostępnić najciekawsze zdjęcia, najważniejsze parametry samochodu jak i historię modyfikacji."+ 
                            " Użytkownicy mogą tworzyć spotkania/spoty gdzie każdy może się do niego dołączyć a końcowo wspólnie spotkać w wybranym miejscu."
                        ,
                    },
                    version: {
                        en:'Version App',
                        pl: "Wersja aplikacji"
                    },
                    author: {
                        en: 'Author',
                        pl: "Autor"
                    },
                    rules: {
                        en: "Terms of use",
                        pl: "Regulamin"
                    },
                    support: {
                        en: "Support",
                        pl: "Pomoc techniczna"
                    }
                },
                themeModal: {
                    headerText: {
                        en: 'Select theme',
                        pl: 'Wybierz motyw'
                    }
                },
                languageModal: {
                    header: {
                        en: "Select language",
                        pl: "Wybierz język"
                    }
                }
            },
        },
        CreateScreen: {
            errorMessage: {
                pl: 'Za duży plik',
                en: "File is too large"
            },
            navTitleText: {
                en: "Add project",
                pl:"Dodaj projekt"
            },
            cameraError: {
                en: "Sorry, Camera roll permissions are required to make this work!",
                pl: ""
            },
            baseHeaderText: {
                en: 'Basic information',
                pl: "Podstawowe informacje"
            },
            inputPlaceholders: {
                make: { en: 'Type car make', pl: 'Podaj marke samochodu'},
                model: { en: 'Type car model', pl: 'Podaj model samochodu'},
                description: { en: 'Short description....', pl: 'Krótki opis...'},
                power: { en: 'Type the power of the car', pl: 'Podaj moc samochodu'},
                torque: { en: 'Type the torque of the car', pl: 'Podaj moment obrotowy samochodu' }
            },
            historyHeaderText: {
                en: 'The history of the car is a place where you can put the changes, the stages that have taken place in the car, show off the effects',
                pl: 'Historia samochodu jest to miejsce gdzie możesz umieścić zmiany, etapy które zaszły w samochodzie, pochwalić się efektami'
            },
            stages: {
                addComponentHeader: {
                    en: "Add components that have been modified",
                    pl: "Dodaj część samochodu która była zmodyfikowana"
                },
                inputs: {
                    descriptionText: {
                        en: "Type stage description",
                        pl: "Podaj opis modyfikacji, etapu"
                    },
                    powerText: {
                        en: "Type power (hp)",
                        pl: "Podaj moc (hp)"
                    },
                    torqueText: {
                        en: 'Type torque (Nm)',
                        pl: 'Podaj moment obrotowy (Nm)'
                    },
                    _0_100Text: {
                        en: "Type 0-100km/h (s)",
                        pl: "Podaj przyśpieszenie 0-100km/h (s)"
                    },
                    _100_200Text: {
                        en: "Type 100-200km/h (s)",
                        pl: "Podaj przyśpieszenie 100-200km/h (s)"
                    },
                    companyText: {
                        en: "The company modifying your car",
                        pl: "Firma modyfikująca auto"
                    }
                },
                addImageHeader:{
                    en: "Add images, e.g. dyno graph",
                    pl: "Dodaj zdjęcia, np. wykres z hamowni"
                }
            },
            selectListPlaceholder: {
                en: "Select car make",
                pl: "Wybierz markę samochodu"    
            },
            imageHelpText_1: {
                en: "Choose images to your gallery",
                pl: "Wybierz zdjędzia ze swojej galerii"
            },
            imageHelpText_2: {
                en: "Minimum one image",
                pl: "Musisz wybrać minimum jedno zdjęcie"
            },
            imageHelpText_3: {
                en: "On long press photo u can set place",
                pl: "Po dłuższym przytrzymaniu zdjęcia możesz wybrać lokalizacje"
            },
            imageHelpText_4: {
                en: "Maximum 5 images",
                pl: "Maksymalnie 5 zdjęć"
            },
            soundHeaderText: {
                en: "Sound check and links",
                pl: "Sound check i linki"
            },
            soundHelpText_1: {
                en: "Choose sound from your phone",
                pl: "Wybierz nagranie z telefonu"
            },
            soundHelpText_2: {
                en:"maximum 200kb file"
            },
            historyHeadeText: {
                en: "Modification process",
                pl: "Przebieg modyfikacji"
            },
            linksHeader: {
                en: "Paste your social links",
                pl: "Wklej linki do innych społecznościówek"
            }
        },
        SettingsScreen: {
            HeaderText: {
                en:'Settings',
                pl: "Ustawienia"
            },
            ThemeText: {
                en: 'Theme',
                pl: 'Motyw'
            },
            InfoText: {
                en: 'Information',
                pl: 'Informacje'
            },
            ProfileText: {
                en: "Edit Profile",
                pl: "Edytuj profil"
            },
            LanguageText: {
                en: 'Language',
                pl: 'Zmień język'
            },
            NotifyText: {
                en: 'Notifications',
                pl: 'Powiadomienia'
            },
            logOutText: {
                en: 'Log Out',
                pl: 'Wyloguj'
            }
        },
        HomeScreen: {   
            textInput: {
                en: "Search project",
                pl: "Wyszukaj projekt"
            }
        },
        ProfileScreen: {
            headerText: {
                en: 'About me',
                pl: 'O mnie'
            },
            followersText: {
                en: 'Followers',
                pl: 'Obserwujący'
            },
            viewsText: {
                en: 'Views',
                pl: 'Wyświetlenia'
            },
            followingText: {
                en: 'Following',
                pl: 'Obserwuje'
            },
            headerProjectsText: {
                en: 'Projects',
                pl: 'Projekty'
            },
            addProjectButton: {
                en: 'ADD PROJECT',
                pl: 'DODAJ PROJEKT'
            }
        },
        Chats: {
            menu: {
                blockText: {
                    en: 'Block',
                    pl: 'Zablokuj'
                },
                unBlockText: {
                    en: 'Unblock',
                    pl:'Odblokuj'
                },
                reportText: {
                    en: "Report",
                    pl: 'Zgłoś'
                },
                deleteText: {
                    en:'Delete chat',
                    pl:"Usuń chat"
                },
            }
        },
        ReportScreen: {
            titleScreen: {
                project: {
                    en: "Report project",
                    pl: "Zgłoś projekt"
                },
                user: {
                    en: "Report user",
                    pl: "Zgłoś użytkownika"
                },
                meeting: {
                    en: "Report meeting",
                    pl: "Zgłoś spotkanie"
                }
            },
            headerText: {
                project: {
                    en: "Why you want to report this project?",
                    pl: "Dlaczego chcesz zgłosić ten projekt? "
                },
                user: {
                    en: "Why you want to report this person?",
                    pl: "Dlaczego chcesz zgłosić tą osobe? "
                },
                meeting: {
                    en: "Why you want to report this meeting?",
                    pl: "Dlaczego chcesz zgłosić te spotkanie? "
                }
            },
            option_1: {
                en: "The data provided to the car is incorrect",
                pl: "Dane samochodu nie są prawidłowe"
            },
            option_2: {
                en: "The pictures do not show anything related to the automotive industry",
                pl: "Zdjęcia nie przedstawiają niczego związanego z motoryzacją"
            },
            option_3: {
                project: {
                    en: "The project breaks the rules",
                    pl: "Projekt łamie regulamin"
                },
                user: {
                    en: "User breaks the rules",
                    pl: "Użytkownik łamie regulamin"
                },
                meeting: {
                    en: "Meeting breaks the rules",
                    pl: "Spotkanie łamie regulamin"
                }
            },
            option_4: {
                en: "If it is something else, write",
                pl: "Jeżeli jest to coś innego, napisz tutaj"
            },
            placeholderOption: {
                en: "Type, why you reporting this project...",
                pl: "Wpisz, dlaczego chcesz zgłosić ten projekt..."
            },
            buttonText: {
                en: "Send report",
                pl: "Wyślij zgłoszenie"
            },
            errorText: {
                en: "Something was wrong, try again later",
                pl: "Coś poszło nie tak, spróbuj ponownie później"
            },
            successText: {
                en: "Report has been sent correctly",
                pl: "Zgłoszenie zostało wysłane"
            }
        },
        CreateMeeting: {
            message: {
                errorText: {
                    en: "Samething was wrong!",
                    pl: "Coś poszło nie tak!"
                },
                successText: {
                    en: "Meeting was created!",
                    pl: "Spotkanie zostało utworzone!"
                },
                errorText2: {
                    pl: "Nie wybrano miejsca",
                    en: "Place was not selected"
                }
            },
            nameMeeting: {
                en:"Name meeting",
                pl:"Nazwa spotkania/spotu"
            },
            dateText: {
                en: "Set date meeting",
                pl: "Ustaw date spotkania/spotu"
            },
            locationText: {
                en:"Set location meeting",
                pl:"Ustaw lokalizacje spotu/spotkania"
            },
            createText: {
                en:"Create",
                pl:"Stwórz"
            }
        },
        MeetingScreen: {
            warningText: {
                en: "Now there are no meetings rooms created",
                pl: "Aktualnie nie ma żadnych spotów, spotkań"
            }
        },
        EditProfile: {
            headerText: {
                en: "Update profile",
                pl: "Edytuj profil"
            },
            placeholders: {
                nameText: {
                    en: "Type profile name",
                    pl: "Wpisz nazwę swojego profilu"
                },
                nameHelpText: {
                    en: "Minimum 3 letters",
                    pl: "Minimalnie 3 litery"
                },
                descriptionText: {
                    en: "Type profile description",
                    pl: "Wpisz opis profilu"
                }
            },
            profileImage:{ 
                en: "Set profile image",
                pl: "Ustaw zdjęcie profilowe"
            },
            placeText: {
                en: "Set place where people can find you",
                pl: "Ustaw miejsce gdzie ludzie mogą Cię spotkać"
            },
        },
        Search: {
            headerText: {
                en: "Search project",
                pl: "Szukaj projektu"
            },
            placeholder: {
                carMakeText: {
                    en: "Choose car make",
                    pl: "Wybierz markę samochodu"
                },
                modelText: {
                    en: "Type model",
                    pl: "Wpisz szukany model"
                }
            }
        },
        Reviews: {
            headerTitle: {
                pl: "Dodaj opinię",
                en: "Add reviews"
            },
            contextText: {
                pl: "Aplikacja cały czas się rozwija, dodaj opinię aby twórca mógł wiedzieć co działa dobrze, co zmienić lub jakiej funkcji aplikacji brakuje",
                en: "The application is constantly developing, add a review so that the creator can know what works well, what to change or what features of the application are missing"
            },
            labelText: {
                pl: "Twoja opinia",
                en: "Your review"
            },
            placeholderText: {
                pl: "Tutaj wpisz swoją opinię",
                en: "There type your review"
            },
            buttonText: {
                pl: "Wyślij",
                en: "Send"
            }
        },
        Terms: {
            headerText: {
                en: "Terms of use",
                pl: "Warunki korzystania"
            }
        }
    }
}
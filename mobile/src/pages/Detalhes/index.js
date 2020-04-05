import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text, Linking, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detalhes(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.nome}, estou entrando em contato pois gostaria de ajudar no caso ${incident.titulo} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.valor)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?text=${message}&phone=${incident.whatsapp}`)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImg} />

                    <TouchableOpacity onPress={navigateBack}>
                        <Feather name="arrow-left" size={28} color="#EB2041" />
                    </TouchableOpacity>
                </View>

                <View style={styles.caso}>
                    <Text style={[styles.casoProp, { marginTop: 0}]}>ONG:</Text>
                    <Text style={styles.casoValor}>{incident.nome} de {incident.cidade}/{incident.uf}</Text>

                    <Text style={styles.casoProp}>CASO:</Text>
                    <Text style={styles.casoValor}>{incident.titulo}</Text>

                    <Text style={styles.casoProp}>VALOR:</Text>

                    <Text style={styles.casoValor}>
                        {
                            Intl.NumberFormat('pt-BR', 
                            { style: 'currency', currency: 'BRL'}).format(incident.valor)
                        }
                    </Text>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>
                
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Casos(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();

    function irDetalhes(incident){
        navigation.navigate('Detalhes', {incident});   
    }

    async function loadIncidents(){       
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('casos', {
            params: {page}
        });

        setIncidents([... incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }), [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList 
                data={incidents}
                style={styles.listaCasos}
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.caso}>
                        <Text style={styles.casoProp}>ONG:</Text>
                        <Text style={styles.casoValor}>{incident.nome}</Text>

                        <Text style={styles.casoProp}>CASO:</Text>
                        <Text style={styles.casoValor}>{incident.titulo}</Text>

                        <Text style={styles.casoProp}>VALOR:</Text>
                        <Text style={styles.casoValor}>
                            {
                                Intl.NumberFormat('pt-BR', 
                                { style: 'currency', currency: 'BRL'}).format(incident.valor)
                            }
                        </Text>
                        
                        <TouchableOpacity style={styles.botaoDetalhes} onPress={() => irDetalhes(incident)}>
                            <Text style={styles.botaoDetalhesTexto}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={17} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
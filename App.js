import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, Slider, TextInput, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Botao extends Component{

  constructor(props){
    super(props);
    this.state = {};

    let largura = 165;
    if(props.largura){
      largura = parseInt(props.largura);
    }

    this.styles = StyleSheet.create({
      botao:{
        width: largura, 
        height: 40, 
        borderWidth: 1, 
        borderColor: 'black', 
        backgroundColor: 'skyblue', 
        borderRadius: 7,
        margin: 10
      },
      areaBotao:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      botaoTexto:{
        fontSize: 20,
        color: 'black'
      }
    });
  }

  render(){
    return(
      <TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
        <View style={this.styles.areaBotao}>
          <Text style={this.styles.botaoTexto}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      data: '',
      sexoKey: 0,
      sexo:[
        {valor: 'Masculino'},
        {valor: 'Feminino'},
        {valor: 'Outros'}
      ],
      bancoKey: 0,
      banco:[
        {nome: 'Bradesco'},
        {nome: 'Caixa'},
        {nome: 'Banco do Brasil'},
        {nome: 'Santander'},
        {nome: 'Banco do Nordeste'}
      ],
      altura: 1,
      peso: 0,
      doador: false,
      salario: 0,
      qtdCartoes: 0
    };

    this.selectData = this.selectData.bind(this);
    this.adicionar = this.adicionar.bind(this);
    this.subtrair = this.subtrair.bind(this);
  }

  selectData(data){
    let s = this.state;
    s.data = data;
    this.setState(s);
  }

  adicionar(){
    let s = this.state;
    s.qtdCartoes++;
    this.setState(s);
  }

  subtrair(){
    let s = this.state;
    s.qtdCartoes--;
    if(s.qtdCartoes < 0){
      s.qtdCartoes = 0;
      Alert.alert('A quantidade de cortões não pode ser menor que 0.');
    }
    this.setState(s);
  }

  render(){

    let sexoValor = this.state.sexo.map((v, k) => {
      return <Picker key={k} value={k} label={v.valor} />
    })

    let banco = this.state.banco.map((v, k)=>{
      return <Picker key={k} value={k} label={v.nome} />
    })

    return(
      <ScrollView style={styles.body}>
          <View style={styles.viewCabecalho}>
            <Text style={styles.textoCabecalho}>Desafio B7Web</Text>
          </View>
          <View style={styles.viewBody}>
            <View>
              <Text style={styles.labels}>Nome</Text>
              <TextInput style={styles.inputNome} placeholder="Digite seu nome"/>
            </View>
            <View>
              <Text style={styles.labels}>Data de Nascimento</Text>
              <DatePicker 
                style={styles.dataPicker}
                date={this.state.data} 
                format="DD-MM-YYYY" 
                minDate="01-01-1900" 
                maxDate="31-12-2020" 
                onDateChange={this.selectData}
              />
            </View>
            <View>
              <Text style={styles.labels}>Sexo</Text>
              <Picker
                style={styles.picker}
                selectedValue={this.state.sexoKey} 
                onValueChange={(itemValue, itemIndex) => this.setState({sexoKey: itemValue})}
              >
                {sexoValor}
              </Picker>
              {/*Caso queira exibir num text o valor selecionado no Picker*/}
              {/*<Text style={styles.labels}>{this.state.sexo[this.state.sexoKey].valor}</Text>*/}
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.labels}>Altura</Text>
              <Slider 
                value={this.state.altura} 
                minimumValue={1} 
                maximumValue={3}
                onValueChange={(v) => this.setState({altura: v})}
                />
              <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18}}>{this.state.altura.toFixed(2)} metros</Text>
            </View>
            <View>
              <Text style={styles.labels}>Peso</Text>
              <Slider 
                value={this.state.peso} 
                minimumValue={0} 
                maximumValue={250}
                onValueChange={(v) => this.setState({peso: v})}
                />
              <Text style={[styles.labels, {textAlign: 'center'}]}>{this.state.peso.toFixed(2)} kg</Text>
            </View>
            <View>
              <Text style={styles.labels}>É doador de sangue?</Text>
              <View style={styles.viewSwitch}>
                <Switch value={this.state.doador} onValueChange={(v)=>this.setState({doador: v})}/>
                <Text style={styles.labels}>{((this.state.doador) ? "Sim" : "Não")}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.labels}>Salário</Text>
              <Slider 
                value={this.state.salario}
                minimumValue={0}
                maximumValue={30000}
                onValueChange={(salario)=>this.setState({salario: salario})}
              />
              <Text style={[styles.labels, {textAlign: 'center'}]}>R$ {this.state.salario.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.labels}>Banco</Text>
              <Picker
                style={styles.picker}
                selectedValue={this.state.bancoKey} 
                onValueChange={(itemValue, itemIndex) => this.setState({bancoKey: itemValue})}
              >
                {banco}
              </Picker>
            </View>
            <View>
              <Text style={styles.labels}>Quantidade de Cartões</Text>
              <View style={styles.viewBtn}>
                <Botao title="-" onPress={this.subtrair}/>
                <Text style={[styles.labels, {padding: 5, fontSize: 18}]}>{this.state.qtdCartoes}</Text>
                <Botao title="+" onPress={this.adicionar}/>
              </View>
            </View>
            <View style={styles.viewBtnEnviar}>
              <Botao largura="390" title="Salvar informações"/>
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
  },
  viewBody:{
    flex: 1
  },
  viewCabecalho:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  textoCabecalho:{
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  labels:{
    fontSize: 18,
    margin: 10
  },
  inputNome:{
    height: 38,
    width: 390,
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 3,
    fontSize: 18,
    padding: 5
  },
  dataRow:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  dataPicker:{
    width: 388,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  picker:{
    backgroundColor: 'silver',
    marginLeft: 10,
    marginRight: 11
  },
  viewSwitch:{
    flexDirection: 'row'
  },
  viewTouch:{
    fontSize: 18,
    backgroundColor: 'white'
  },
  viewBtn:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  viewBtnEnviar:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
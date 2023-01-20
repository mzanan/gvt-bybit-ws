const data = require('../modules/WSmodules')
console.log("myData ", data)

class Trades {
  constructor(data) {
    this.closed_size = data.closed_size
    this.exec_fee    = data.exec_fee   
    this.exec_price  = data.exec_price 
    this.exec_qty    = data.exec_qty   
    this.exec_time   = data.exec_time  
    this.exec_value  = data.exec_value 
    this.fee_rate    = data.fee_rate   
    this.order_price = data.order_price
    this.order_qty   = data.order_qty  
    this.order_type  = data.order_type 
  }

  getTrades(){
    this.closed_size
    this.exec_fee    
    this.exec_price  
    this.exec_qty    
    this.exec_time   
    this.exec_value  
    this.fee_rate    
    this.order_price 
    this.order_qty   
    this.order_type  
  }
}

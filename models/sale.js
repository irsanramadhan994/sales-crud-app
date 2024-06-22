// models/sale.js
module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      product_name: { type: DataTypes.STRING, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      transaction_date: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      },
      product_type_id: { type: DataTypes.INTEGER, references: { model: 'ProductTypes', key: 'id' } }
    });
  
    Sale.associate = models => {
      Sale.belongsTo(models.ProductType, { foreignKey: 'product_type_id' });
    };
  
    return Sale;
  };
  
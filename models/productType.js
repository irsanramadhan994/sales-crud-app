
module.exports = (sequelize, DataTypes) => {
    const ProductType = sequelize.define('ProductType', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    ProductType.associate = models => {
      ProductType.hasMany(models.Sale, { foreignKey: 'product_type_id' });
    };
  
    return ProductType;
  };
  
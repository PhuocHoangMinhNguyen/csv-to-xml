const header = [{
    id: 0,
    content: "OrderAction", // mandatory
}, {
    id: 1,
    content: "OrderNumber", // mandatory
}, {
    id: 2,
    content: "ClientCode", // mandatory - but already in the folder name
}, {
    id: 3,
    content: "SupplierCode", // mandatory
}, {
    id: 4,
    content: "FreightForwarder",
}, {
    id: 5,
    content: "CustomsBroker",
}, {
    id: 6,
    content: "Goods",
}, {
    id: 7,
    content: "OverseasAgent",
}, {
    id: 8,
    content: "BuyingAgent",
}, {
    id: 9,
    content: "TransportMode", // Sea or Air // mandatory
}, {
    id: 10,
    content: "Currency", // USD or AUD or EUR
}, {
    id: 11,
    content: "DirectOrTranship", // Direct or Tranship // mandatory
}, {
    id: 12,
    content: "RequiredInStore",
}, {
    id: 13,
    content: "OriginPort",
}, {
    id: 14,
    content: "DischargePort",
}, {
    id: 15,
    content: "DestinationPort",
}, {
    id: 16,
    content: "EstimatedContainers",
}, {
    id: 17,
    content: "EstimatedPackages",
}, {
    id: 18,
    content: "GrossWeight",
}, {
    id: 19,
    content: "UnitOfWeight", //KG or LB
}, {
    id: 20,
    content: "CubicMeters",
}, {
    id: 21,
    content: "OrderValue",
}, {
    id: 22,
    content: "PickupRequired",
}, {
    id: 23,
    content: "ClientPurchaseOrder",
}, {
    id: 24,
    content: "IndentOrder", // Yes or No
}, {
    id: 25,
    content: "HazardousGoods", // Yes or No
}, {
    id: 26,
    content: "OrderTerms",
}, {
    id: 27,
    content: "ConfirmEmail",
}, {
    id: 28,
    content: "OrderComment",
}];

const mandatoryHeader = [{
    id: 0,
    content: "OrderAction", // mandatory
}, {
    id: 1,
    content: "OrderNumber", // mandatory
}, {
    id: 2,
    content: "ClientCode", // mandatory
}, {
    id: 3,
    content: "SupplierCode", // mandatory
}, {
    id: 4,
    content: "DirectOrTranship", // Direct or Tranship // mandatory
}, {
    id: 5,
    content: "TransportMode", // Sea or Air // mandatory
}];

const line = [{
    id: 0,
    content: "OrderLineAction",
}, {
    id: 1,
    content: "OrderLineNumber",
}, {
    id: 2,
    content: "PartNumber",
}, {
    id: 3,
    content: "PartDescription",
}, {
    id: 4,
    content: "OrderQuantity",
}, {
    id: 5,
    content: "UnitOfMeasure",
    // BAG, BAGS, BALE, BOXS, BRLS, BTLS, CANS, CASE, CNTR, COIL, 
    // CTN, CTNS, CYL, DRUM, IB, JR, KG, LB, LI, M3, PCS, PKG,
    // PKGS, PLT, PLTS, RACK, REEL, ROLL, ROLLS, SCRL, SETS, SHEET,
    // SKD, SKDS, TANK, TINS, TN, UNIT, VEH
}, {
    id: 6,
    content: "ItemPrice",
}, {
    id: 7,
    content: "PartRequiredDate",
}, {
    id: 8,
    content: "LineTransportMode", // Sea or Air
}];

module.exports = { header, mandatoryHeader, line };
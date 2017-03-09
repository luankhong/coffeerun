QUnit.test( 'hello test', function( assert ) {
    assert.ok( 1 == '1', 'Passed!' );
});

QUnit.test('DataStore.prototype.get', function( assert ) {
    var App = window.App;
    var ds = new App.DataStore();
    ds.add('me@goldfinger.com', 'double mocha');
    ds.add('dr@no.com', 'decaf');
    ds.add('m@bond.com', 'earl grey');

    assert.ok(ds.get('m@bond.com') == 'earl grey', 'key of m@bond.com returned earl grey');
    assert.ok(ds.get('dr@no.com') == 'decaf', 'key of dr@no.com returned decaf');
    assert.ok(ds.get('me@goldfinger.com') == 'double mocha', 'key of me@goldfinger.com returned double mocha');
});

QUnit.test('DataStore.prototype.getAll', function( assert ) {
    var App = window.App;
    var ds = new App.DataStore();
    ds.add('me@goldfinger.com', 'double mocha');
    ds.add('dr@no.com', 'decaf');
    ds.add('m@bond.com', 'earl grey');

    var orders = ds.getAll();   //<--------------Testing getAll()
    assert.ok(orders['m@bond.com'] == 'earl grey', 'key of m@bond.com returned earl grey');
    assert.ok(orders['dr@no.com'] == 'decaf', 'key of dr@no.com returned decaf');
    assert.ok(orders['me@goldfinger.com'] == 'double mocha', 'key of me@goldfinger.com returned double mocha');
});

//The problem I ran into is displaying diliverOrder() into Qunit assert..
QUnit.test('Truck', function( assert ) {
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var truck = new Truck('ncc-1701', new DataStore());
    truck.createOrder({emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
    truck.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'});
    truck.createOrder({emailAddress: 'm@bond.com', coffee: 'earl grey'});

    var order1 = truck.db.get('me@goldfinger.com');
    var order2 = truck.db.get('dr@no.com');
    var order3 = truck.db.get('m@bond.com');
    assert.ok(order1.emailAddress == 'me@goldfinger.com' && order1.coffee == 'double mocha', order1.emailAddress + ' ordered ' + order1.coffee);
    assert.ok(order2.emailAddress == 'dr@no.com' && order2.coffee == 'decaf', order2.emailAddress + ' ordered ' + order2.coffee);
    assert.ok(order3.emailAddress == 'm@bond.com' && order3.coffee == 'earl grey', order3.emailAddress + ' ordered ' + order3.coffee);

    assert.ok(1 == '1', truck.summaryOrders());

    truck.deliverOrder('dr@no.com');
    assert.ok(!('dr@no.com' in truck), 'Delivering order for dr@no.com');

    truck.deliverOrder('m@bond.com');
    assert.ok(!('m@bond.com' in truck), 'Delivering order for m@bond.com');

    assert.ok(1 == '1', truck.summaryOrders());

});
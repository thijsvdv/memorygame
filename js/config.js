const Config = {
    num_rows: 4,
    num_cols: 4,
    // tile_width: 211,
    // tile_height: 211,
    tile_width: document.getElementById('game').offsetWidth/4,
    tile_height: document.getElementById('game').offsetWidth/4,
    images: [
        "../img/tiles/img1",
        "../img/tiles/img2",
        "../img/tiles/img3",
        "../img/tiles/img4",
        "../img/tiles/img5",
        "../img/tiles/img6",
        "../img/tiles/img7",
        "../img/tiles/img8"
    ],
    hashids: {
        salt: "sgdN78tYeYd3rGIyMVDW2CWetDHq8xp5",
        length: 8,
        alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    }
}

export default Config
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 1 versions',
                'ie >= 11', // last 2 versionsの設定でie10以上になります。
                'iOS >= 10',
                'Android >= 4.4'
            ],
            cascade: false
        })
    ],
}

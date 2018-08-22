(function (window) {
  if (!window) return;

  var magicwallet_bts_account;
  var magicwallet_pay_data;

  var magicwallet_send_bts_account = function (data) {
    var magicwalletBtsAccount = JSON.parse(localStorage.getItem('magicwallet_pay_data'));
    if (magicwalletBtsAccount) {
      magicwallet_bts_account = magicwalletBtsAccount;
    }

    magicwallet_bts_account = data;
  }

  var magicwallet_get_pay_data = function () {
    return magicwallet_pay_data;
  }

  var magicwalletGetBtsAccount = function () {
    return new Promise(function (resolve, reject) {
      if (!magicwallet_bts_account) {
        var get_bts_account_interval = setInterval(function () {
          var bts_account = magicwallet_bts_account;
          if (bts_account) {
            resolve(bts_account);
            clearInterval(get_bts_account_interval);
          }
        }, 1000)

        setTimeout(() => {
          clearInterval(get_bts_account_interval);
        }, 15000);
      } else {
        resolve(magicwallet_bts_account)
      }
    })
  }

  var magicwallet_timeout_promise = function (ms) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, ms);
    }).then(function () {
      throw ("error");
    });
  }

  var magicwallet_get_bts_account = function () {
    return Promise.race([
      magicwalletGetBtsAccount(),
      magicwallet_timeout_promise(15000),
    ])
  }


  var magicwallet_confirm_pay = function (pay_account, pay_asset, pay_amount, order_id, platform) {
    if (!pay_account || !pay_asset || !pay_amount || !order_id || !platform) {
      return
    }
    magicwallet_pay_data = {
      pay_account: pay_account,
      pay_asset: pay_asset,
      pay_amount: pay_amount,
      order_id: order_id,
    }


    if (platform == 'ios') {
      location.href = location.href + '#magicWalletBtsPayClose';
    } else if ('android') {
      localStorage.setItem('magicwallet_pay_data', JSON.stringify(magicwallet_pay_data));
      location.href = location.href + '&magicWalletBtsPayClose';
    }
  }

  var magicwallet_close_button = function (platform) {
    if (!platform) {
      return
    }

    if (platform == 'ios') {
      location.href = location.href + "#magicWalletCloseButton";
    } else if (platform == 'android') {
      location.href = location.href + '&magicWalletCloseButton';
    }
  }

  window.magicwallet_send_bts_account = magicwallet_send_bts_account;
  window.magicwallet_get_pay_data = magicwallet_get_pay_data;
  window.magicwallet_get_bts_account = magicwallet_get_bts_account;
  window.magicwallet_confirm_pay = magicwallet_confirm_pay;
  window.magicwallet_close_button = magicwallet_close_button;
})(window)
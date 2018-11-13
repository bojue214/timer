import tokens from '_/token';

test('token.create', () => {   
    let token = tokens.create('aaaaaa');
    expect(token).toHaveProperty('account', 'aaaaaa');
    expect(token).toHaveProperty('token');
});

test('token.get', () => {
    let origin = tokens.create('aaaaaa');
    let token = tokens.get('aaaaaa');
    expect(token.token).toBe(origin.token);
    let token1 = tokens.get(origin.token);
    expect(token1.token).toBe(origin.token);
});

test('token.delete', () => {
    let token = tokens.create('aaaaaa');
    tokens.delete('aaaaaa');
    token = tokens.get('aaaaaa');
    expect(token).toBe(undefined);
    token = tokens.create('bbbbbbb');
    let token2 = token.token;
    tokens.delete(token2);
    token = tokens.get(token2);
    expect(token).toBe(undefined);
});

test('token.update', (done) => {
    let token = tokens.create('aaaaaa');
    let updateTime = token.updateTime;
    let tokenInfo = token.token;
    setTimeout(function(){
        tokens.update('aaaaaa');
        expect(updateTime < tokens.get('aaaaaa').updateTime).toBe(true);
        tokens.update(tokenInfo);
        expect(updateTime < tokens.get('aaaaaa').updateTime).toBe(true);
        done();
    }, 100)
});

test('token.expire', () => {
    let token = tokens.create('dsadas');
    tokens.expire(token.token);
    let tokenE = tokens.get('dsadas');
    expect(tokenE.expireTime <= new Date().getTime()).toBe(true);
});

test('token.verify', () => {
    let ret = tokens.verify('dsadas');
    expect(ret).toBe(0);
    let tokenInfo = tokens.create('account');
    let ret1 = tokens.verify(tokenInfo.token);
    expect(ret1).toBe(1);
    tokens.expire(tokenInfo.token);
    ret1 = tokens.verify(tokenInfo.token);
    expect(ret1).toBe(-1);
});
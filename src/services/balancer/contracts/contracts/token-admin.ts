import { Contract } from '@ethersproject/contracts';
import { formatUnits } from 'ethers/lib/utils';

import TokenAdminAbi from '@/lib/abi/TokenAdmin.json';
import { Multicaller } from '@/lib/utils/balancer/contract';
import { configService } from '@/services/config/config.service';
import { rpcProviderService } from '@/services/rpc-provider/rpc-provider.service';
import { web3Service } from '@/services/web3/web3.service';

export class BalancerTokenAdmin {
  instance: Contract;

  constructor(
    public readonly address: string,
    private readonly provider = rpcProviderService.jsonProvider,
    private readonly abi = TokenAdminAbi,
    private readonly config = configService,
    private readonly web3 = web3Service
  ) {
    this.instance = new Contract(this.address, this.abi, this.provider);
  }

  async getInflationRate() {
    const rate = await this.instance.getInflationRate();
    return formatUnits(rate, 18);
  }

  private getMulticaller(): Multicaller {
    return new Multicaller(this.config.network.key, this.provider, this.abi);
  }
}

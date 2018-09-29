import { IRequestParameters } from './RequestParameters';
import { Request } from 'express';

export function getRequestParameters(req: Request): IRequestParameters {
  const isPercentage = typeof req.params.isPercentage !== 'undefined' ? req.params.isPercentage : true;
  const symbols = req.params.symbols ? req.params.symbols.split(',') : [];
  const size = req.params.size;

  return {
    isPercentage,
    symbols,
    size
  };
}
